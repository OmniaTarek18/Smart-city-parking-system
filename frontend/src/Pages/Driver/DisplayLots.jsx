import React from "react";
import { Container, Card, Button } from "@mui/material";

const DisplayLots = () => {
  // Sample data for parking lots
  const parkingLots = [
    {
      id: 1,
      name: "Central Parking",
      location: "Downtown, City A",
      price: "$10/hr",
    },
    {
      id: 2,
      name: "Westside Parking",
      location: "West Avenue, City B",
      price: "$8/hr",
    },
    {
      id: 3,
      name: "Eastside Parking",
      location: "East Road, City C",
      price: "$12/hr",
    },
    {
      id: 4,
      name: "Green Park Parking",
      location: "Green Park, City D",
      price: "$15/hr",
    },
    {
      id: 5,
      name: "Riverside Parking",
      location: "Riverside Street, City E",
      price: "$9/hr",
    },
  ];
  const handleBooking = () => {
    
  };
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Available Parking Lots</h2>
      <div className="row">
        {parkingLots.map((lot) => (
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
    </Container>
  );
};

export default DisplayLots;
