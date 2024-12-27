import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import axios from "axios";
import "./registeration.css";
import { useLocation } from "react-router-dom";

function SignUp() {
  const location = useLocation();
  const creditCard = location.state || {};
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(creditCard || {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    licensePlate: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const validateEmail = async (email) => {
    try {
      const key = "ff29d55610e84c9493625ad5cd09f5b4";
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${key}&email=${email}`
      );
      return response.data.is_smtp_valid.value;
    } catch (error) {
      console.error("Email validation error:", error);
      return false;
    }
  };

  const validate = async () => {
    const newErrors = {};

    // First and last name validation
    const nameRegex = /^[a-zA-Z]{3,}$/;
    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      newErrors.firstName = "Enter a valid first name (at least 3 characters)";
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Enter a valid last name (at least 3 characters)";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      setLoading(true);
      const isEmailValid = await validateEmail(formData.email);
      setLoading(false);
      if (!isEmailValid) {
        newErrors.email = "Invalid email address";
      }
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // License plate validation
    const licensePlateRegex = /^[A-Za-z]{3}[0-9]{3}$/;
    if (!formData.licensePlate || !licensePlateRegex.test(formData.licensePlate)) {
      newErrors.licensePlate = "License plate must be 3 letters followed by 3 numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      console.log(formData);
      const { confirmPassword, ...dataToSend } = formData;
      navigate("/payment-details", { state: dataToSend });
    }
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
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
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
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
        </div>
        <PhoneInput
          country="us"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          inputStyle={{
            width: "100%",
            height: "56px",
            fontSize: "16px",
            borderRadius: "4px",
            borderColor: errors.phoneNumber ? "red" : "#c4c4c4",
          }}
        />
        {errors.phoneNumber && (
          <Typography color="error" variant="body2">
            {errors.phoneNumber}
          </Typography>
        )}
        <TextField
          fullWidth
          label="License Plate"
          name="licensePlate"
          type="text"
          margin="normal"
          value={formData.licensePlate}
          onChange={handleChange}
          required
          error={Boolean(errors.licensePlate)}
          helperText={errors.licensePlate}
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
          error={Boolean(errors.email)}
          helperText={loading ? "Validating..." : errors.email}
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
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
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
