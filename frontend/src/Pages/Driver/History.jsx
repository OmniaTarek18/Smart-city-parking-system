import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useUser } from '../../Context/UserContext';

function History() {
  const { userId } = useUser(); // User ID from context
  const [value, setValue] = useState(0); // Tab index
  const [reservations, setReservations] = useState({
    inProgress: [],
    upcoming: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getStatusByTabIndex = (index) => {
    if (index === 0) return 'ACTIVE';
    if (index === 1) return 'UPCOMING';
    return 'PAST';
  };


  const renderReservations = (reservations) => {
    if (loading) {
      return <CircularProgress />;
    }
    if (reservations.length === 0) {
      return <Typography>No reservations found.</Typography>;
    }
    return reservations.map((reservation, index) => (
      <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {reservation.name || 'Unnamed Reservation'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Date: ${reservation.date || 'N/A'}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Time: ${reservation.time || 'N/A'}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Location: ${reservation.location || 'N/A'}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Status: ${reservation.status || 'N/A'}`}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        className="mt-5"
        value={value}
        onChange={handleChange}
        aria-label="booking tabs"
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab label="In progress" />
        <Tab label="Upcoming" />
        <Tab label="Past" />
      </Tabs>
      <Box sx={{ padding: 3 }}>
        {value === 0 && renderReservations(reservations.inProgress)}
        {value === 1 && renderReservations(reservations.upcoming)}
        {value === 2 && renderReservations(reservations.past)}
      </Box>
    </Box>
  );
}

export default History;
