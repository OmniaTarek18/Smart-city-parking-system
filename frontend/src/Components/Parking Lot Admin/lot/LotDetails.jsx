import React, { useState, useEffect } from "react";
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
import { getOccupancyRate } from "../../../api/lotManagementAPI";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const LotDetails = ({ lot, onSpotStatusChange, onSpotEdit, onSpotDelete }) => {
  const [showReport, setShowReport] = useState(false);
  const [spots, setSpots] = useState(lot.spots);
  const [occupancyRate, setOccupancyRate] = useState(null);

  useEffect(() => {
    const fetchOccupancyRate = async () => {
      try {
        const rate = await getOccupancyRate(lot.id);
        setOccupancyRate(rate);
      } catch (error) {
        console.error("Failed to fetch occupancy rate", error);
      }
    };

    fetchOccupancyRate();
  }, [lot.id]);

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

  const ParkingLotReport = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Parking Lot Report</Text>
          <Text style={styles.subtitle}>Parking Lot: {lot.name}</Text>
          <Text style={styles.text}>
            Location: {lot.location.latitude}, {lot.location.longitude}
          </Text>
          <Text style={styles.text}>
            Total Capacity:{" "}
            {lot.capacity_ev + lot.capacity_regular + lot.capacity_handicap}
          </Text>
          <Text style={styles.text}>Occupancy Rate: {occupancyRate}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Parking Spots:</Text>
          {spots.map((spot) => (
            <Text key={spot.id} style={styles.text}>
              Spot {spot.id}: {spot.status} ({spot.type})
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

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
          Report generation has been completed. Below is the PDF preview.
        </Typography>

        {occupancyRate !== null && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Occupancy Rate: {occupancyRate}%
          </Typography>
        )}

        <Box sx={{ mt: 3 }}>
          <PDFDownloadLink
            document={<ParkingLotReport />}
            fileName={`${lot.name}_parking_lot_report.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button variant="contained" disabled>
                  Generating Report...
                </Button>
              ) : (
                <Button variant="contained">Download Report</Button>
              )
            }
          </PDFDownloadLink>
        </Box>
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
