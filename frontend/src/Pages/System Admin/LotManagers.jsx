import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LotManagers.css";
import AddLotManager from "./AddLotManager";

function LotManagers() {
  const [lotManagers, setLotManagers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;
  const [isAdding, setIsAdding] = useState(false);

  const handleSearch = async () => {
    try {
      const criteria = {
        firstName,
        lastName,
        email,
        phone,
        pageNum,
        pageSize
      };

      const response = await axios.post("http://localhost:8080/admin/searchLotManagers", criteria, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        setLotManagers(response.data);
      }
    } catch (error) {
      console.error('Error fetching lot managers:', error);
    }
  };

  const handleSearchClick = () => {
    setPageNum(1); // Reset to first page when a new search is performed
    handleSearch();
  };

  // Handle Pagination
  const handlePagination = (direction) => {
    const newPageNum = direction === 'next' ? pageNum + 1 : pageNum - 1;
    setPageNum(newPageNum);
    handleSearch();
  };

  const handleAddSuccess = () => {
    setIsAdding(false);
    handleSearch();
  };

  const handleCloseModal = () => {
    setIsAdding(false);
  };

  useEffect(() => {
    handleSearch();
  }, [pageNum, pageSize]);

  return (
    <div className="lot-managers-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <table className="lot-managers-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {lotManagers.map((manager, index) => (
            <tr key={index}>
              <td>{manager.firstName}</td>
              <td>{manager.lastName}</td>
              <td>{manager.email}</td>
              <td>{manager.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls-right">
        <button
          className="pagination-btn"
          onClick={() => handlePagination("prev")}
          disabled={pageNum === 1}
        >
          ◀
        </button>
        <span className="pagination-text">Page {pageNum}</span>
        <button className="pagination-btn" onClick={() => handlePagination("next")}>
          ▶
        </button>
      </div>
      <button className="popupButton" onClick={() => setIsAdding(true)}>Add Lot Manager</button>
      {isAdding && <AddLotManager onAddSuccess={handleAddSuccess} onClose={handleCloseModal} />}
    </div>
  );
}

export default LotManagers;
