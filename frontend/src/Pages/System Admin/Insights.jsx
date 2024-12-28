import React, { useState, useEffect } from 'react';
import './Insights.css';
import './LotManagers.css';

const Insights = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [topParkingLots, setTopParkingLots] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageLots, setCurrentPageLots] = useState(1);
  const pageSize = 10; // Fixed page size

  // Fetch top users data
  const fetchTopUsers = async (page) => {
    try {
      const url = new URL("http://localhost:8080/admin/insights/top-users");
      const params = new URLSearchParams({ pageSize, pageNum: page });
      url.search = params.toString();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTopUsers(data);
      } else {
        console.error("Failed to fetch top users data");
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };

  // Fetch top parking lots data
  const fetchTopParkingLots = async (page) => {
    try {
      const url = new URL("http://localhost:8080/admin/insights/top-parking-lots");
      const params = new URLSearchParams({ pageSize, pageNum: page });
      url.search = params.toString();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTopParkingLots(data);
      } else {
        console.error("Failed to fetch top parking lots data");
      }
    } catch (error) {
      console.error("Error fetching top parking lots:", error);
    }
  };

  // Add this within the Insights component
  const generateTopUsersReport = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/reports/top-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "TopUsersReport.pdf"; // Adjust the file name as needed
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate top users report");
      }
    } catch (error) {
      console.error("Error generating top users report:", error);
    }
  };

  const generateTopParkingLotsReport = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/reports/top-parking-lots", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "TopParkingLotsReport.pdf"; // Adjust the file name as needed
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate top parking lots report");
      }
    } catch (error) {
      console.error("Error generating top parking lots report:", error);
    }
  };


  useEffect(() => {
    fetchTopUsers(currentPageUsers);
    fetchTopParkingLots(currentPageLots);
  }, [currentPageUsers, currentPageLots]);

  const handleUserPageChange = (direction) => {
    setCurrentPageUsers((prev) => Math.max(1, prev + direction));
  };

  const handleLotPageChange = (direction) => {
    setCurrentPageLots((prev) => Math.max(1, prev + direction));
  };

  return (
    <div className="insights-container">
      {/* Top Users Section */}
      <div className="insights-section">
        <h2 className="section-title">Top Users</h2>
        <div className="insights-table-container">
          <table className="insights-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Total Revenue</th>
                <th>Violations</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.totalRevenue}</td>
                  <td>{user.violations}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-controls-right">
          <button
            className="pagination-btn"
            onClick={() => handleUserPageChange(-1)}
            disabled={currentPageUsers === 1}
          >
            ◀
          </button>
          <span className="pagination-text">Page {currentPageUsers}</span>
          <button className="pagination-btn" onClick={() => handleUserPageChange(1)}>
            ▶
          </button>
        </div>
        <button className="popupButton" onClick={generateTopUsersReport}>
          Download Top Users Report
        </button>
      </div>

      {/* Top Parking Lots Section */}
      <div className="insights-section">
        <h2 className="section-title">Top Parking Lots</h2>
        <div className="insights-table-container">
          <table className="insights-table">
            <thead>
              <tr>
                <th>Lot Name</th>
                <th>Occupancy Rate</th>
                <th>Total Revenue</th>
                <th>Violations</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {topParkingLots.map((lot, index) => (
                <tr key={index}>
                  <td>{lot.lotName}</td>
                  <td>{lot.occupancyRate}</td>
                  <td>{lot.totalRevenue}</td>
                  <td>{lot.violations}</td>
                  <td>{lot.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-controls-right">
          <button
            className="pagination-btn"
            onClick={() => handleLotPageChange(-1)}
            disabled={currentPageLots === 1}
          >
            ◀
          </button>
          <span className="pagination-text">Page {currentPageLots}</span>
          <button className="pagination-btn" onClick={() => handleLotPageChange(1)}>
            ▶
          </button>
        </div>
        <button className="popupButton" onClick={generateTopParkingLotsReport}>
          Download Top Parking Lots Report
        </button>
      </div>
    </div>
  );
};

export default Insights;
