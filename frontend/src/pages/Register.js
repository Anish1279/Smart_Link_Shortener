// Registration Page
import React from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
<<<<<<< HEAD
import { useAuthStore } from '../context/AuthContext';
import { Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, isSigningUp } = useAuthStore();



  const validateForm=()=>{
    if(!formData.name.trim()) return toast.error("Name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length<6) return toast.error("Password must be at least 6 characters");
    if(formData.password!==formData.confirmPassword) return toast.error("Passwords do not match");
    return true;

  }
  const handleSubmit = async (e) => {

    e.preventDefault();
    const success=validateForm();
    if (success === true) {
      signup({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }

  }

=======

const Register = () => {
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <PersonAddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>Create Account</Typography>
        </Box>
<<<<<<< HEAD
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} 
          onSubmit={handleSubmit}>
 <TextField
  label="Full Name"
  variant="outlined"
  fullWidth
  required
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
/>
          <TextField label="Email" type="email" fullWidth required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          />
          <TextField label="Password" type="password" fullWidth required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          />
          <TextField label="Confirm Password" type="password" fullWidth required
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }} disabled={isSigningUp}>
           {isSigningUp ? (
            <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
            </>
           ) :(
          "Create Account"
           )}</Button>
          

        </Box>
        <br></br>
        <div className='text-center'>
          <p className="text-base-content/60">
            Already have an account ? <Link to="/login" className="link link-primary">Sign in </Link>
          </p>
        </div>
=======
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Full Name" type="text" fullWidth required />
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Password" type="password" fullWidth required />
          <TextField label="Confirm Password" type="password" fullWidth required />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }}>Create Account</Button>
        </Box>
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
      </Paper>
    </Container>
  );
};

export default Register;
