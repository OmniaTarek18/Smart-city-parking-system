import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
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
  const { setUserId } = useUser(); 
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "driver",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Logged in successfully:", data);
        setUserId(data);
        navigate("/user-home-page/search");
        setError(null);
      }
      else {
        return response.text().then((message) => {
          setError(message);
          console.log(message);
        });
      }
    } catch (err) {
      console.log("Login error:", err.message);
    }
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
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <FormControlLabel value="driver" control={<Radio />} label="Driver" />
          <FormControlLabel
            value="parking_lot_admin"
            control={<Radio />}
            label="Parking Lot Admin"
          />
          <FormControlLabel
            value="system_admin"
            control={<Radio />}
            label="System Admin"
          />
        </RadioGroup>
        {error && ( 
          <div style={{color:"red"}}>
            <strong>Error:</strong> {error}
          </div>
        )}
        <Button
          className="button mt-4 p-3"
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
