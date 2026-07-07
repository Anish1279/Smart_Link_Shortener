// Registration Page
import React from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <PersonAddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>Create Account</Typography>
        </Box>
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Full Name" type="text" fullWidth required />
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <TextField label="Confirm Password" type="password" fullWidth required />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }}>Create Account</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
