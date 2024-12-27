import React, { useEffect, useState } from "react";
import axios from "axios";
import Confirmation from "./Confimation";

function Users() {
  const [drivers, setDrivers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;
  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const fetchWorstDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/getWorstDrivers", {
        params: {
          pageNum,
          pageSize,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        console.log("Updated driver list:", response.data); // Debug log
        setDrivers(response.data);
      }
    } catch (error) {
      console.error("Error fetching worst drivers:", error);
    }
  };

  // Handle Pagination
  const handlePagination = (direction) => {
    const newPageNum = direction === 'next' ? pageNum + 1 : pageNum - 1;
    setPageNum(newPageNum);
    fetchWorstDrivers();
  };

  const handleBlockClick = (driver) => {
    setSelectedDriver(driver);
    setIsBlocking(true);
  };

  const handleBlockSuccess = async () => {
    if (selectedDriver) {
      try {
        const url = `http://localhost:8080/admin/blockDriver?email=${encodeURIComponent(selectedDriver.email)}`;
        const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
  
        if (response.ok) {
          // Filter out the blocked driver from the UI directly for faster update
          setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.email !== selectedDriver.email));
        } else {
          alert(`Failed to block user with email ${selectedDriver.email}.`);
        }
      } catch (error) {
        console.error("Error blocking user:", error);
        alert("An error occurred while blocking the user.");
      }
    }
    setIsBlocking(false);
    setSelectedDriver(null);
  };

  const handleCloseModal = () => {
    setIsBlocking(false);
    setSelectedDriver(null);
  };

  useEffect(() => {
    fetchWorstDrivers();
  }, [pageNum, pageSize]);

  return (
    <div className="lot-managers-container">
      <table className="lot-managers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total Violations</th>
            <th>Faulty Spots Count</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.phone}</td>
              <td>{driver.totalViolations}</td>
              <td>{driver.faultySpotsCount}</td>
              <td>{driver.score}</td>
              <td>
                <button className="action-btn" onClick={() => handleBlockClick(driver)}>Block</button>
                {isBlocking && selectedDriver === driver && <Confirmation
                  message={`Are you sure you want to block the user with this email "${driver.email}"?`}
                  onSuccess={handleBlockSuccess}
                  onClose={handleCloseModal} />}
              </td>
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
    </div>
  );
}
export default Users;
