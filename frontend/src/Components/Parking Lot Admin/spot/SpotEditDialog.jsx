import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SpotEditDialog = ({ open, onClose, spot, onUpdate }) => {
  const [status, setStatus] = useState(spot?.status || "AVAILABLE");
  const [type, setType] = useState(spot?.type || "REGULAR");

  const handleSubmit = () => {
    const updatedSpotData = { type, status }; 
    if (onUpdate) onUpdate(updatedSpotData); 
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Parking Spot {spot?.id}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="AVAILABLE">Available</MenuItem>
            <MenuItem value="RESERVED">Reserved</MenuItem>
            <MenuItem value="OCCUPIED">Occupied</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="REGULAR">Regular</MenuItem>
            <MenuItem value="HANDICAP">Handicap</MenuItem>
            <MenuItem value="EV">EV Charging</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SpotEditDialog;
