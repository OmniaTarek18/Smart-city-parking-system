import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import SpotCard from "../spot/SpotCard";
import { updateParkingSpot } from "../../../api/parkingSpotsAPI";

const LotDetails = ({ lot, onSpotStatusChange, onSpotEdit, onSpotDelete }) => {
  const [showReport, setShowReport] = useState(false);
  const [spots, setSpots] = useState(lot.spots); 

  const handleSpotUpdate = async (spotId, updatedSpotData) => {
    try {
      const parkingSpotData = {
        id: spotId,
        ParkingLot_id: lot.id,
        type: updatedSpotData.type || "REGULAR",
        status: updatedSpotData.status || "AVAILABLE",
      };
      await updateParkingSpot(lot.id, spotId, parkingSpotData);
      const updatedSpots = spots.map((spot) =>
        spot.id === spotId ? { ...spot, ...updatedSpotData } : spot
      );

      setSpots(updatedSpots); 
      onSpotStatusChange(updatedSpots); 
    } catch (error) {
      console.error(error);
      alert("Failed to update parking spot. Please try again.");
    }
  };

  if (showReport) {
    return (
      <Box sx={{ p: 3 }}>
        <Button
          variant="outlined"
          onClick={() => setShowReport(false)}
          sx={{ mb: 2 }}
        >
          Back to Details
        </Button>
        <Typography variant="h6">
          Report generation will be implemented here using Jasper.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography variant="h4" gutterBottom>
              {lot.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Latitude: {lot.location.latitude}, Longitude:{" "}
              {lot.location.longitude}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              Total capacity:{" "}
              {lot.capacity_ev + lot.capacity_regular + lot.capacity_handicap}
            </Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<PictureAsPdf />}
            onClick={() => setShowReport(true)}
          >
            Generate Report
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Parking Spots Status
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {spots.map((spot) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  onStatusChange={(newStatus) =>
                    handleSpotUpdate(spot.id, { status: newStatus })
                  }
                  onUpdate={handleSpotUpdate}
                  onDelete={onSpotDelete}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LotDetails;
