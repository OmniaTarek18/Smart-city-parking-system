import React, { useState } from "react";
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

  const handleAddLot = (lotData) => {
    const newLot = {
      id: Date.now(),
      ...lotData,
      occupiedSpots: 0,
      reservedSpots: 0,
      totalCapacity:
        lotData.capacity.regular +
        lotData.capacity.disabled +
        lotData.capacity.evCharging,
      spots: Array.from(
        {
          length:
            lotData.capacity.regular +
            lotData.capacity.disabled +
            lotData.capacity.evCharging,
        },
        (_, index) => ({
          id: index + 1,
          status: "available",
          type:
            index < lotData.capacity.regular
              ? "regular"
              : index < lotData.capacity.regular + lotData.capacity.disabled
              ? "disabled"
              : "ev",
        })
      ),
    };
    setLots([...lots, newLot]);
  };

  const handleEditLot = (lotId) => {
    const lot = lots.find((l) => l.id === lotId);
    setEditingLot(lot);
    setIsFormOpen(true);
  };

  const handleUpdateLot = (updatedLotData) => {
    setLots(
      lots.map((lot) =>
        lot.id === editingLot.id ? { ...lot, ...updatedLotData } : lot
      )
    );
    setEditingLot(null);
  };

  const handleDeleteLot = (lotId) => {
    setLots(lots.filter((lot) => lot.id !== lotId));
    if (selectedLot?.id === lotId) {
      setSelectedLot(null);
    }
  };

  const handleViewLot = (lotId) => {
    const lot = lots.find((l) => l.id === lotId);
    setSelectedLot(lot);
  };

  const handleSpotStatusChange = (lotId, spotId, newStatus) => {
    setLots(
      lots.map((lot) => {
        if (lot.id === lotId) {
          const updatedSpots = lot.spots.map((spot) =>
            spot.id === spotId ? { ...spot, status: newStatus } : spot
          );
          const occupiedCount = updatedSpots.filter(
            (s) => s.status === "occupied"
          ).length;
          const reservedCount = updatedSpots.filter(
            (s) => s.status === "reserved"
          ).length;
          return {
            ...lot,
            spots: updatedSpots,
            occupiedSpots: occupiedCount,
            reservedSpots: reservedCount,
          };
        }
        return lot;
      })
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

          {selectedLot ? (
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
                onClick={() => setIsFormOpen(true)}
              >
                <Add />
              </Fab>
            </>
          )}

          <LotForm
            open={isFormOpen}
            onClose={() => {
              setIsFormOpen(false);
              setEditingLot(null);
            }}
            onSubmit={editingLot ? handleUpdateLot : handleAddLot}
            initialData={editingLot}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MyLot;
