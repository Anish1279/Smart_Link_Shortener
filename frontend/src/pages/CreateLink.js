// Create Short Link Page
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const CreateLink = () => {
  const [formData, setFormData] = useState({ longUrl: '', customAlias: '', expiresAt: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from flashing/reloading

    if (!formData.longUrl.trim()) {
      return toast.error('Long URL is required');
    }

    setIsLoading(true);
    try {
      const payload = {
        longUrl: formData.longUrl,
        ...(formData.customAlias && { customAlias: formData.customAlias }),
        ...(formData.expiresAt && { expiresAt: formData.expiresAt }),
      };

      await api.post('/links', payload);
      toast.success('Link created successfully!');
      navigate('/dashboard'); // Go back to dashboard to see the link
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <ContentCutIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>Shorten a Link</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField 
            label="Long URL" 
            type="url" 
            fullWidth 
            required 
            placeholder="https://example.com"
            value={formData.longUrl}
            onChange={(e) => setFormData({ ...formData, longUrl: e.target.value })}
          />
          <TextField 
            label="Custom Alias (optional)" 
            type="text" 
            fullWidth 
            placeholder="my-cool-link"
            value={formData.customAlias}
            onChange={(e) => setFormData({ ...formData, customAlias: e.target.value })}
          />
          <TextField 
            label="Expiry Date (optional)" 
            type="datetime-local" 
            fullWidth 
            InputLabelProps={{ shrink: true }} 
            value={formData.expiresAt}
            onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
          />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Short Link'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateLink;
