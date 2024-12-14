import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
} from "@mui/material";
function CreditCard() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="container p-5">
      <Typography variant="h4" gutterBottom>
        Payment Method
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <TextField
            fullWidth
            label="Cardholder's Name"
            name="cardholderName"
            type="text"
            margin="normal"
            value={formData.cardholderName}
            onChange={handleChange}
            required
          />
        </div>
        <TextField
          fullWidth
          label="Card Number"
          name="cardNumber"
          margin="normal"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Expiration Date"
          name="expirationDate"
          type="Date"
          margin="normal"
          value={formData.expirationDate}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true, // This ensures that the label is above the input field even when focused
          }}
          sx={{
            '& .MuiInputBase-root': {
              paddingTop: '10px', // Adjust the padding to prevent overlap
            }
          }}
        />
        <TextField
          fullWidth
          label="CVV"
          name="cvv"
          type="password"
          margin="normal"
          value={formData.cvv}
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}
export default CreditCard;
