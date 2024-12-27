import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Fab,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import LotList from "../../Components/Parking Lot Admin/lot/LotList";
import LotForm from "../../Components/Parking Lot Admin/lot/LotForm";
import LotDetails from "../../Components/Parking Lot Admin/lot/LotDetails";
import {
  addParkingLot,
  updateParkingLot,
  deleteParkingLot,
} from "../../api/lotManagementAPI";
import { fetchParkingSpots } from "../../api/parkingSpotsAPI";
import geocodeLocation from "../../utils/geocodeLocation";
import { getParkingLotsByOwnerId } from "../../api/lotManagementAPI"; 

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
});

function MyLot() {
  const [lots, setLots] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [editingLot, setEditingLot] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const ownerId = 1; // temp till merge isa

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const fetchedLots = await getParkingLotsByOwnerId(ownerId); 
        setLots(fetchedLots); 
      } catch (error) {
        setError("Failed to load parking lots.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, [ownerId]);

  const handleAddLot = async (lotData) => {
    try {
      const { latitude, longitude } = await geocodeLocation(lotData.location);
      const newLot = {
        name: lotData.name,
        location: { latitude, longitude },
        capacity_regular: lotData.capacity.regular,
        capacity_handicap: lotData.capacity.disabled,
        capacity_ev: lotData.capacity.evCharging,
        owner_id: ownerId, 
      };

      const response = await addParkingLot(newLot);
      const spots = await fetchParkingSpots(response);

      const addedLot = {
        id: response,
        ...newLot,
        spots,
        locationStr: lotData.location,
        totalCapacity:
          lotData.capacity.regular +
          lotData.capacity.disabled +
          lotData.capacity.evCharging,
      };

      setLots([...lots, addedLot]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding lot:", error);
    }
  };

  const handleEditLot = (lotId) => {
    const lot = lots.find((l) => l.id === lotId);
    setEditingLot(lot);
    setIsFormOpen(true);
  };

  const handleUpdateLot = async (updatedLotData) => {
    try {
      const { latitude, longitude } = await geocodeLocation(
        updatedLotData.location || editingLot.locationStr
      );

      const updatedLot = {
        id: editingLot.id,
        name: updatedLotData.name || editingLot.name,
        location: { latitude, longitude },
        capacity_regular:
          updatedLotData.capacity.regular || editingLot.capacity_regular,
        capacity_handicap:
          updatedLotData.capacity.disabled || editingLot.capacity_handicap,
        capacity_ev:
          updatedLotData.capacity.evCharging || editingLot.capacity_ev,
        owner_id: 1,
      };

      await updateParkingLot(editingLot.id, updatedLot);

      setLots((prevLots) =>
        prevLots.map((lot) =>
          lot.id === editingLot.id
            ? {
                ...lot,
                ...updatedLot,
                locationStr: updatedLotData.location || lot.locationStr,
              }
            : lot
        )
      );

      setIsFormOpen(false);
      setEditingLot(null);
    } catch (error) {
      console.error("Error updating lot:", error);
    }
  };

  const handleDeleteLot = async (lotId) => {
    try {
      await deleteParkingLot(lotId);
      setLots((prevLots) => prevLots.filter((lot) => lot.id !== lotId));
      if (selectedLot?.id === lotId) {
        setSelectedLot(null);
      }
    } catch (error) {
      console.error("Error deleting lot:", error);
    }
  };

  const handleViewLot = (lotId) => {
    const lot = lots.find((l) => l.id === lotId);
    setSelectedLot(lot);
  };

  const handleSpotStatusChange = (lotId, spotId, newStatus) => {
    setLots((prevLots) =>
      prevLots.map((lot) =>
        lot.id === lotId
          ? {
              ...lot,
              spots: lot.spots.map((spot) =>
                spot.id === spotId ? { ...spot, status: newStatus } : spot
              ),
            }
          : lot
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Parking Lot Manager
          </Typography>

          {loading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : selectedLot ? (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ cursor: "pointer", color: "primary.main" }}
                  onClick={() => setSelectedLot(null)}
                >
                  ← Back to lots
                </Typography>
              </Box>
              <LotDetails
                lot={selectedLot}
                onSpotStatusChange={(spotId, newStatus) =>
                  handleSpotStatusChange(selectedLot.id, spotId, newStatus)
                }
              />
            </>
          ) : (
            <>
              <LotList
                lots={lots}
                onEdit={handleEditLot}
                onDelete={handleDeleteLot}
                onView={handleViewLot}
              />
              <Fab
                color="primary"
                sx={{
                  position: "fixed",
                  bottom: 16,
                  right: 16,
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                  transition: "transform 0.2s",
                }}
                onClick={() => {
                  setIsFormOpen(true);
                  setEditingLot(null);
                }}
              >
                <Add />
              </Fab>
            </>
          )}

          {isFormOpen && (
            <LotForm
              open={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              onSubmit={editingLot ? handleUpdateLot : handleAddLot}
              editingLot={editingLot}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MyLot;
