import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const AnalyticsChartCard = ({ title, subtitle, children }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {subtitle}
        </Typography>
      )}
      <Box sx={{ mt: 1 }}>{children}</Box>
    </CardContent>
  </Card>
);

export default AnalyticsChartCard;
