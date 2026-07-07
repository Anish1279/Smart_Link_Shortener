// App Navbar
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';

const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar>
        <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}>
          SmartLink
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button variant="contained" component={RouterLink} to="/register">Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
