import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

function CreditCard() {
  const navigate = useNavigate();
  const { setUserId } = useUser();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state || {});
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.cardHolderName || formData.cardHolderName.trim().length < 3) {
      newErrors.cardHolderName = "Cardholder's name must be at least 3 characters.";
    }
    if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!formData.expirationDate || new Date(formData.expirationDate) <= new Date()) {
      newErrors.expirationDate = "Expiration date must be in the future.";
    }
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for the field
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Sign Up is done successfully:", data);
        setUserId(data);
        navigate("/user-home-page/search");
      } else {
        const message = await response.text();
        setSnackbarMessage(message);
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.log("Sign up error:", err.message);
      setSnackbarMessage("An error occurred. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="container p-5">
      <Typography variant="h4" gutterBottom>
        Payment Method
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Cardholder's Name"
          name="cardHolderName"
          type="text"
          margin="normal"
          value={formData.cardHolderName || ""}
          onChange={handleChange}
          error={!!errors.cardHolderName}
          helperText={errors.cardHolderName}
          required
        />
        <TextField
          fullWidth
          label="Card Number"
          name="cardNumber"
          margin="normal"
          value={formData.cardNumber || ""}
          onChange={handleChange}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
          required
        />
        <TextField
          fullWidth
          label="Expiration Date"
          name="expirationDate"
          type="date"
          margin="normal"
          value={formData.expirationDate || ""}
          onChange={handleChange}
          error={!!errors.expirationDate}
          helperText={errors.expirationDate}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="CVV"
          name="cvv"
          type="password"
          margin="normal"
          value={formData.cvv || ""}
          onChange={handleChange}
          error={!!errors.cvv}
          helperText={errors.cvv}
          required
        />
        <div className="d-flex justify-content-center">
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            className="mt-4 p-3"
            onClick={() => navigate("/", { state: formData })}
          >
            Prev
          </Button>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4 p-3"
          >
            Sign Up
          </Button>
        </div>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreditCard;
