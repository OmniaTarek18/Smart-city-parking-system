import React, { useState } from "react";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import "./registeration.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
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
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <RadioGroup
          row
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <FormControlLabel value="driver" control={<Radio />} label="Driver" />
          <FormControlLabel
            value="parkingAdmin"
            control={<Radio />}
            label="Parking Lot Admin"
          />
          <FormControlLabel
            value="systemAdmin"
            control={<Radio />}
            label="System Admin"
          />
        </RadioGroup>
        <Button
          className="button mt-4"
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
