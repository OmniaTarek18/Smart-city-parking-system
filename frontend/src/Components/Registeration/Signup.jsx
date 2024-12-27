import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import axios from "axios"; // Use axios for API requests
import "./registeration.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    licensePlateNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      console.log(response.data); // Add this line to check the response
      return response.data.is_smtp_valid.value; // Corrected the typo
    } catch (error) {
      console.error("Email validation error:", error);
      return false; // Assume invalid on error
    }
  };

  const validate = async () => {
    const newErrors = {};

    // Name validation
    const nameRegex = /^[a-zA-Z]{3,}$/;
    if (formData.firstName && !nameRegex.test(formData.firstName)) {
      newErrors.firstName = "Enter a valid name with at least 3 characters";
    }
    if (formData.lastName && !nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Enter a valid name with at least 3 characters";
    }

    // Email validation
    if (formData.email) {
      setLoading(true); // Show loading spinner
      const isEmailValid = await validateEmail(formData.email);
      setLoading(false); // Hide loading spinner
      if (!isEmailValid) {
        newErrors.email = "Invalid email address";
      }
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // License plate validation 3 letters followed by 3 numbers
    const licensePlateRegex = /^[A-Za-z]{3}[0-9]{3}$/;
    if (
      formData.licensePlateNumber &&
      !licensePlateRegex.test(formData.licensePlateNumber)
    ) {
      newErrors.licensePlateNumber = "Invalid license plate number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();

    if (isValid) {
      console.log(formData);
      navigate("/payment-details");
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
          country={"us"}
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          inputStyle={{
            width: "100%",
            height: "56px",
            fontSize: "16px",
            borderRadius: "4px",
            borderColor: errors.phoneNumber ? "red" : "#c4c4c4",
          }}
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
          error={Boolean(errors.licensePlateNumber)}
          helperText={errors.licensePlateNumber}
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
          label="Password Confirmation"
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
