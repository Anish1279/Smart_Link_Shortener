// Create Short Link Page
import React from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const CreateLink = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <ContentCutIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" gutterBottom>Shorten a Link</Typography>
        </Box>
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Long URL" type="url" fullWidth required />
          <TextField label="Custom Alias (optional)" type="text" fullWidth />
          <TextField label="Expiry Date (optional)" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} />
          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }}>Create Short Link</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateLink;
