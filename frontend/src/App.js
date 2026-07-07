// Root Application Component
import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';

=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
import Navbar from './components/Layout/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateLink from './pages/CreateLink';
import Analytics from './pages/Analytics';
<<<<<<< HEAD
import { useAuthStore } from './context/AuthContext';
import { useEffect } from 'react';
import { Loader } from "lucide-react";

function App() {

  const { authUser,  checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser) return
  ( <div className="flex items-center justify-center h-screen">
  <Loader className="size-10 animate-spin"></Loader> </div>)
    
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
        <Router>
          <Navbar />
      <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/dashboard" /> } />
            <Route path="/" element={ authUser ? <Dashboard />: <Navigate to="/login" /> } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreateLink />
              </ProtectedRoute>
            } />
            <Route path="/analytics/:id" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      
=======

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateLink /></ProtectedRoute>} />
            <Route path="/analytics/:id" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
    </ThemeProvider>
  );
}

export default App;
