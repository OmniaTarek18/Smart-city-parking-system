import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  IconButton, 
  Box,
  Chip,
  CardMedia,
  CardActions,
  Button
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Visibility,
  LocalParking,
  AccessibleForward,
  EvStation,
  LocationOn
} from '@mui/icons-material';
import { blue, green } from '@mui/material/colors';

const LotList = ({ lots, onEdit, onDelete, onView }) => {
  const getOccupancyColor = (occupiedSpots, totalCapacity) => {
    const percentage = (occupiedSpots / totalCapacity) * 100;
    return percentage > 80 ? 'error' : percentage > 50 ? 'warning' : 'success';
  };

  return (
    <Grid container spacing={3}>
      {lots.map((lot) => {
        {console.log(lot)}
        return (
          <Grid item xs={12} sm={6} md={4} key={lot.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: blue[50],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocalParking sx={{ fontSize: 60, color: blue[300] }} />
              </CardMedia>

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" gutterBottom component="div">
                  {lot.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    justifyContent: "center",
                  }}
                >
                  <LocationOn sx={{ color: "text.secondary", mr: 1 }} />
                  <Typography color="text.secondary">
                    {lot.locationStr}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={`Capacity: ${
                      lot.capacity_ev +
                      lot.capacity_regular +
                      lot.capacity_handicap
                    }`}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                </Box>

                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <LocalParking />
                      <Typography variant="body2">
                        {lot.capacity_regular}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <AccessibleForward />
                      <Typography variant="body2">
                        {lot.capacity_handicap}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                      <EvStation />
                      <Typography variant="body2">{lot.capacity_ev}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => onView(lot.id)}
                >
                  View
                </Button>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => onEdit(lot.id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => onDelete(lot.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LotList;