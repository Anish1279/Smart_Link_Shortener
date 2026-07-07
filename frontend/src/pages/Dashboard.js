// User Dashboard
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Paper, List, ListItem, ListItemText, Link as MuiLink } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AnalyticsIcon from '@mui/icons-material/BarChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link as RouterLink } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../utils/constants';



const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Derive the domain from the API URL so the short link works correctly
  // Example: if API is http://localhost:5001/api, the base app is http://localhost:5001
  const appBaseUrl = API_BASE_URL.replace(/\/api$/, '');

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/links');
      setLinks(response.data);
    } catch (error) {
      toast.error('Failed to load links');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Links
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />} 
            onClick={fetchLinks}
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button variant="contained" color="primary" startIcon={<AddLinkIcon />} component={RouterLink} to="/create">
            Create Link
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : links.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2, backgroundColor: 'background.paper' }} elevation={2}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You don't have any short links yet.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Click the button above to create your first short link and start tracking clicks!
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2}>
          <List>
            {links.map((link, index) => {
              const shortUrl = `${appBaseUrl}/${link.shortCode}`;
              return (
                <ListItem key={link._id} divider={index !== links.length - 1}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            <MuiLink href={shortUrl} target="_blank" rel="noopener noreferrer">
                              {shortUrl}
                            </MuiLink>
                          </Typography>
                          <Button size="small" variant="outlined" onClick={() => {
                            navigator.clipboard.writeText(shortUrl);
                            toast.success('Copied to clipboard!');
                          }}>
                            Copy
                          </Button>
                         
                        </Box>
                         <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<AnalyticsIcon />}
                            component={RouterLink}
                            to={`/analytics/${link._id}`}
                          >
                            Analytics
                          </Button>
                       
                      </Box>
                    }
                    secondary={`Original: ${link.longUrl}`}
                  />
                </ListItem>
              )
            })}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;
