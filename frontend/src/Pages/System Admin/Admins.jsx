import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LotManagers.css";
import AddAdmin from "./AddAdmin";
import Confirmation from "./Confimation";

function Admins() {
    const [admins, setAdmins] = useState([]);
    const [email, setEmail] = useState('');
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 10;
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleSearch = async () => {
        try {
            const criteria = {
                email,
                pageNum,
                pageSize
            };

            const response = await axios.post("http://localhost:8080/admin/getAdmins", criteria, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setAdmins(response.data);
            }
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const handleSearchClick = () => {
        setPageNum(1); // Reset to first page when a new search is performed
        handleSearch();
    };

    // Handle Pagination
    const handlePagination = (direction) => {
        setPageNum((prev) => Math.max(1, prev + direction));
        handleSearch();
    };

    const handleDeleteClick = (driver) => {
        setSelectedAdmin(driver);
        setIsDeleting(true);
    };

    const handleDeleteSuccess = async () => {
        if (selectedAdmin) {
            try {
                const url = `http://localhost:8080/admin/deleteAdmin?email=${encodeURIComponent(selectedAdmin)}`;
                const response = await fetch(url, { method: "DELETE", headers: { "Content-Type": "application/json" } });

                if (response.ok) {
                    // Filter out the blocked driver from the UI directly for faster update
                    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin !== selectedAdmin));
                } else {
                    const errorMessage = await response.text();
                    alert(`Failed to delete admin with email ${selectedAdmin}.\n${errorMessage}`);
                }
            } catch (error) {
                console.error("Error deleting admin:", error);
                alert("An error occurred while deleting the admin.");
            }
        }
        setIsDeleting(false);
        setSelectedAdmin(null);
    };

    const handleAddSuccess = () => {
        setIsAdding(false);
        handleSearch();
    };

    const handleCloseModal1 = () => {
        setIsAdding(false);
    };

    const handleCloseModal2 = () => {
        console.log("Closing modal...");
        setIsDeleting(false);
        setSelectedAdmin(null);
    };

    useEffect(() => {
        handleSearch();
    }, [pageNum, pageSize]);

    return (
        <div className="lot-managers-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <table className="lot-managers-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin, index) => (
                        <tr key={index}>
                            <td>{admin}</td>
                            <td>
                                <button className="action-btn" onClick={() => handleDeleteClick(admin)}>Delete</button>
                                {isDeleting && selectedAdmin === admin && <Confirmation
                                    message={`Are you sure you want to delete the admin with this email "${admin}"?`}
                                    onSuccess={handleDeleteSuccess}
                                    onClose={handleCloseModal2} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls-right">
                <button
                    className="pagination-btn"
                    onClick={() => handlePagination(-1)}
                    disabled={pageNum === 1}
                >
                    ◀
                </button>
                <span className="pagination-text">Page {pageNum}</span>
                <button className="pagination-btn" onClick={() => handlePagination(1)}>
                    ▶
                </button>
            </div>
            <button className="popupButton" onClick={() => setIsAdding(true)}>Add Admin</button>
            {isAdding && <AddAdmin onAddSuccess={handleAddSuccess} onClose={handleCloseModal1} />}
        </div>
    );
}

export default Admins;
