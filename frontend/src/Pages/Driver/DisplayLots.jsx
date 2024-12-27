import React, { useState } from "react";
import { Container, Card, Button, Pagination } from "@mui/material";

const DisplayLots = () => {
  // Sample data for parking lots
  const parkingLots = [
    { id: 1, name: "Central Parking", location: "Downtown, City A", price: "$10/hr" },
    { id: 2, name: "Westside Parking", location: "West Avenue, City B", price: "$8/hr" },
    { id: 3, name: "Eastside Parking", location: "East Road, City C", price: "$12/hr" },
    { id: 4, name: "Green Park Parking", location: "Green Park, City D", price: "$15/hr" },
    { id: 5, name: "Riverside Parking", location: "Riverside Street, City E", price: "$9/hr" },
    { id: 6, name: "Hilltop Parking", location: "Hilltop Area, City F", price: "$11/hr" },
    { id: 7, name: "Downtown Parking", location: "Central City, City G", price: "$7/hr" },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate the displayed lots for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLots = parkingLots.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleBooking = () => {
    console.log("Booking clicked");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Available Parking Lots</h2>
      <div className="row">
        {currentLots.map((lot) => (
          <div key={lot.id} className="col-6 mb-4">
            {/* Card */}
            <Card
              sx={{
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { boxShadow: 5 },
              }}
            >
              <h4 className="mb-3">{lot.name}</h4>
              <p className="text-secondary mb-2">
                <strong>Location:</strong> {lot.location}
              </p>
              <p className="text-success mb-4">
                <strong>Price:</strong> {lot.price}
              </p>
              <Button
                variant="contained"
                color="primary"
                className="w-100"
                sx={{ borderRadius: "20px" }}
                onClick={handleBooking}
              >
                Book Now
              </Button>
            </Card>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          count={Math.ceil(parkingLots.length / itemsPerPage)} // Total number of pages
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </Container>
  );
};

export default DisplayLots;
