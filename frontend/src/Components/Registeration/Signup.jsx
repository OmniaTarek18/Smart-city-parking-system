import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import "./registeration.css";
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    paymentMethod: "",
    licensePlateNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/payment-details");
  };

  return (
    <div className="container p-5">
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            type="text"
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            type="text"
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          margin="normal"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="License Plate Number"
          name="licensePlateNumber"
          type="text"
          margin="normal"
          value={formData.licensePlateNumber}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Password Confirmation"
          name="confirmPassword"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button
          className="button p-3 mt-4"
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
