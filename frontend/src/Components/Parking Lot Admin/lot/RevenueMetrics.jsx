import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { 
  AttachMoney, 
  TrendingUp, 
  Schedule, 
  LocalAtm 
} from '@mui/icons-material';

const MetricCard = ({ icon, title, value, color }) => (
  <Paper 
    elevation={3} 
    sx={{ 
      p: 2,
      height: '100%',
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      border: `1px solid ${color}30`,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Box
        sx={{
          backgroundColor: `${color}15`,
          borderRadius: '50%',
          p: 1,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
    </Box>
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: color }}>
      {value}
    </Typography>
  </Paper>
);

const RevenueMetrics = ({ lot }) => {
  const calculateMetrics = () => {
    const occupiedSpots = lot.spots.filter(s => s.status === 'occupied').length;
    const baseRate = lot.pricing.baseRate;
    const congestionRate = lot.pricing.congestionRate;
    const occupancyPercentage = (occupiedSpots / lot.totalCapacity) * 100;
    const currentRate = baseRate * (1 + (occupancyPercentage >= 80 ? congestionRate / 100 : 0));
    
    // Simulate daily revenue (8 hours of average occupancy)
    const dailyRevenue = (currentRate * occupiedSpots * 8).toFixed(2);
    // Simulate monthly revenue (22 working days)
    const monthlyRevenue = (dailyRevenue * 22).toFixed(2);
    // Average rate including congestion
    const averageRate = currentRate.toFixed(2);
    
    return {
      dailyRevenue,
      monthlyRevenue,
      averageRate,
      occupancyPercentage: occupancyPercentage.toFixed(1)
    };
  };

  const metrics = calculateMetrics();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          icon={<AttachMoney sx={{ color: '#2E7D32' }} />}
          title="Today's Revenue"
          value={`$${metrics.dailyRevenue}`}
          color="#2E7D32"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          icon={<Schedule sx={{ color: '#ED6C02' }} />}
          title="Current Rate"
          value={`$${metrics.averageRate}/hr`}
          color="#ED6C02"
        />
      </Grid>

    </Grid>
  );
};

export default RevenueMetrics;