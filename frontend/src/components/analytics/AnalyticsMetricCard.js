import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AnalyticsMetricCard = ({ title, value, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="overline" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

export default AnalyticsMetricCard;
