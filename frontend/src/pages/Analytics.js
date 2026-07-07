// Per-Link Analytics Page
import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

const Analytics = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <BarChartIcon sx={{ fontSize: 36, color: 'primary.main', mr: 1 }} />
        <Typography variant="h4" component="h1">Link Analytics</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, textAlign: 'center' }}><Typography variant="h3">—</Typography><Typography variant="body2">Total Clicks</Typography></Paper></Grid>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, textAlign: 'center' }}><Typography variant="h3">—</Typography><Typography variant="body2">Unique Visitors</Typography></Paper></Grid>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, textAlign: 'center' }}><Typography variant="h6">—</Typography><Typography variant="body2">Top Referrer</Typography></Paper></Grid>
        <Grid item xs={12} sm={6} md={3}><Paper sx={{ p: 3, textAlign: 'center' }}><Typography variant="h6">—</Typography><Typography variant="body2">Top Device</Typography></Paper></Grid>
        <Grid item xs={12} md={8}><Paper sx={{ p: 3, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Clicks over time</Typography></Paper></Grid>
        <Grid item xs={12} md={4}><Paper sx={{ p: 3, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography>Device breakdown</Typography></Paper></Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
