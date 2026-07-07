// Login Page
import React from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
<<<<<<< HEAD
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

=======

const Login = () => {
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <LoginIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>Welcome Back</Typography>
        </Box>
<<<<<<< HEAD

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
=======
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }}>Sign In</Button>
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
<<<<<<< HEAD

=======
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
