// User Dashboard
import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Links
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddLinkIcon />} component={RouterLink} to="/create">
          Create Link
        </Button>
      </Box>
      <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2, backgroundColor: 'background.paper' }} elevation={2}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          You don't have any short links yet.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Click the button above to create your first short link and start tracking clicks!
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;
