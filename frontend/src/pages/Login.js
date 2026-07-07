// Login Page
import React from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <LoginIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>Welcome Back</Typography>
        </Box>
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }}>Sign In</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
