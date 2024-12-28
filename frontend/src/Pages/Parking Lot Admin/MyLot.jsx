import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Fab,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Pagination,
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
import { createOrUpdatePricingStrategy } from "../../api/pricestrategy"; 

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const ownerId = 1; // temp till merge isa

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const fetchedLots = await getParkingLotsByOwnerId(ownerId);
        setLots(fetchedLots);
      } catch (error) {
        setError("Failed to load parking lots.");
        console.error("Error fetching lots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, [ownerId]);

  const totalPages = Math.ceil(lots.length / itemsPerPage);
  const displayedLots = lots.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      console.log("kk")
      console.log(lotData)
      // add pricing strategy after adding lot
      const pricingStrategyData = [
        {
          spot_type: "regular",
          parkingLot_id: response,
          cost: lotData.pricing.regular.baseRate,
          congestion_added_percent: lotData.pricing.regular.congestionRate,
        },
        {
          spot_type: "handicap",
          parkingLot_id: response,
          cost: lotData.pricing.disabled.baseRate,
          congestion_added_percent: lotData.pricing.disabled.congestionRate,
        },
        {
          spot_type: "ev",
          parkingLot_id: response,
          cost: lotData.pricing.evCharging.baseRate,
          congestion_added_percent: lotData.pricing.evCharging.congestionRate,
        },
      ];

      for (const strategy of pricingStrategyData) {
        await createOrUpdatePricingStrategy(strategy); 
      }
    } catch (error) {
      console.error("Error adding lot:", error);
    }
  };
const handleViewLot = async (lotId) => {
  try {
    const lot = lots.find((l) => l.id === lotId);

    if (lot) {
      const updatedSpots = await fetchParkingSpots(lotId);
      setLots((prevLots) =>
        prevLots.map((l) =>
          l.id === lotId ? { ...l, spots: updatedSpots } : l
        )
      );
      setSelectedLot({ ...lot, spots: updatedSpots });
    }
  } catch (error) {
    console.error(error);
  }
};
  const handleEditLot = (lotId) => {
    const lot = lots.find((l) => l.id === lotId);
    setEditingLot(lot);
    setIsFormOpen(true);
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

      // update pricing strategy after updating lot
      const pricingStrategyData = [
        {
          spot_type: "regular",
          parkingLot_id: editingLot.id,
          cost: updatedLotData.pricing.regular.baseRate,
          congestion_added_percent: updatedLotData.pricing.regular.congestionRate,
        },
        {
          spot_type: "handicap",
          parkingLot_id: editingLot.id,
          cost: updatedLotData.pricing.disabled.baseRate,
          congestion_added_percent: updatedLotData.pricing.disabled.congestionRate,
        },
        {
          spot_type: "ev",
          parkingLot_id: editingLot.id,
          cost: updatedLotData.pricing.evCharging.baseRate,
          congestion_added_percent: updatedLotData.pricing.evCharging.congestionRate,
        },
      ];

      for (const strategy of pricingStrategyData) {
        await createOrUpdatePricingStrategy(strategy); 
      }
    } catch (error) {
      console.error("Error updating lot:", error);
    }
  };

  const handleDeleteLot = async (lotId) => {
    console.log(lotId)
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {loading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : displayedLots.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                color="textSecondary"
                sx={{ fontSize: "24px" }}
              >
                No data available.
              </Typography>
            </Box>
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
                lots={displayedLots}
                onEdit={handleEditLot}
                onDelete={handleDeleteLot}
                onView={handleViewLot}
              />

              {/* mui pagination */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                />
              </Box>
            </>
          )}
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
