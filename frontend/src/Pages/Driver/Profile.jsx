import React from "react";
import { Container, Card } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Profile = () => {
  const driverData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "01277859443",
    licensePlate: "ABC-1234",
    paymentMethod: {
      cardholderName: "Jo",
      cardNumber: "123 456 789",
      expirationDate: "2026-5-12",
      cvv: "",
    },
    role: "Driver", // Driver, Lot Manager, System Admin
  };

  return (
    <Container className="mt-5">
      <Card
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <div className="card p-4">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div
              className="rounded-circle d-flex justify-content-center align-items-center bg-primary text-white"
              style={{ width: "60px", height: "60px" }}
            >
              <DirectionsCarIcon />
            </div>
            <h4 className="ms-3 mb-0">{driverData.name}</h4>
          </div>

          {/* Profile Details */}
          <div className="mb-3">
            <h6 className="text-secondary mb-1">Email</h6>
            <p className="mb-0">{driverData.email}</p>
          </div>

          <div className="mb-3">
            <h6 className="text-secondary mb-1">Phone</h6>
            <p className="mb-0">{driverData.phone}</p>
          </div>

          <div className="mb-3">
            <h6 className="text-secondary mb-1">License Plate</h6>
            <p className="mb-0">{driverData.licensePlate}</p>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <CreditCardIcon className="text-primary me-2" />
            <div>
              <h6 className="text-secondary mb-1">Payment Method</h6>
              <p className="mb-0">
                {driverData.paymentMethod.cardholderName} -{" "}
                {driverData.paymentMethod.cardNumber} -{" "}
                {driverData.paymentMethod.expirationDate}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          {/* <div className="text-center mt-4">
            <button className="btn btn-primary">Edit Profile</button>
          </div> */}
        </div>
      </Card>
    </Container>
  );
};

export default Profile;
