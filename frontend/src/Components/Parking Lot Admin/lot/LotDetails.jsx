import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  Button
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { blue, green, orange } from '@mui/material/colors';
import { PictureAsPdf } from '@mui/icons-material';
import SpotCard from "../spot/SpotCard"
import RevenueMetrics from './RevenueMetrics';

const LotDetails = ({ lot, onSpotStatusChange, onSpotEdit, onSpotDelete }) => {
  const [showReport, setShowReport] = useState(false);

  const occupancyData = [
    { name: 'Occupied', value: lot.occupiedSpots },
    { name: 'Reserved', value: lot.reservedSpots || 0 },
    { name: 'Available', value: lot.totalCapacity - lot.occupiedSpots - (lot.reservedSpots || 0) }
  ];

  const COLORS = [orange[500], blue[500], green[500]];


  const calculateCurrentRate = () => {
    const baseRate = lot.pricing.baseRate;
    const congestionRate = lot.pricing.congestionRate;
    const occupancyPercentage = (lot.occupiedSpots / lot.totalCapacity) * 100;
    const congestionMultiplier = 1 + (occupancyPercentage >= 80 ? congestionRate / 100 : 0);
    return (baseRate * congestionMultiplier).toFixed(2);
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
        <h> here would be report which will be done using jasper</h>
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
              {lot.location}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              Current Rate: ${calculateCurrentRate()}/hour
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
      {/* Revenue Metrics */}
      <Box sx={{ mb: 3 }}>
        <RevenueMetrics lot={lot} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Real-time Occupancy
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {occupancyData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

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
              {lot.spots.map((spot) => (
                <SpotCard
                  key={spot.id}
                  spot={spot}
                  onStatusChange={onSpotStatusChange}
                  onEdit={onSpotEdit}
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