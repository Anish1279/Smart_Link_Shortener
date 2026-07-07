// Login Page
import React from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useAuthStore } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim()) return toast.error('Email is required');
    if (!formData.password.trim()) return toast.error('Password is required');

    login({ email: formData.email, password: formData.password });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <LoginIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>Welcome Back</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }} disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

