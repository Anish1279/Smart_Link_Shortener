// User Dashboard
import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">My Links</Typography>
        <Button variant="contained" startIcon={<AddLinkIcon />} component={RouterLink} to="/create">
          Create Link
        </Button>
      </Box>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">No links yet</Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;
