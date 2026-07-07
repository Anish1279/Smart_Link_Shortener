// Per-link analytics page
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import AnalyticsMetricCard from '../components/analytics/AnalyticsMetricCard';
import AnalyticsChartCard from '../components/analytics/AnalyticsChartCard';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const RANGE_OPTIONS = [
  { value: '1', label: 'Today' },
  { value: '7', label: 'Last 7 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '90', label: 'Last 90 Days' },
  { value: 'all', label: 'All Time' },
];

const PIE_COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#d32f2f'];

const Analytics = () => {
  const { linkId } = useParams();
  const [analytics, setAnalytics] = useState({
    totalClicks: 0,
    clicksOverTime: [],
    topReferrers: [],
    browserBreakdown: [],
    deviceBreakdown: [],
    recentClicks: [],
  });
  const [range, setRange] = useState('7');
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/links/${linkId}/analytics?range=${range}`);
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (linkId) {
      fetchAnalytics();
    }
  }, [linkId, range]);

  const summaryStats = useMemo(() => {
    const topBrowser = analytics.browserBreakdown[0]?.browser || 'N/A';
    const topReferrer = analytics.topReferrers[0]?.referrer || 'Direct';
    const topDevice = analytics.deviceBreakdown[0]?.device || 'N/A';

    return [
      { title: 'Total Clicks', value: analytics.totalClicks, subtitle: 'All tracked visits' },
      { title: 'Top Browser', value: topBrowser, subtitle: 'Most used browser' },
      { title: 'Top Referrer', value: topReferrer, subtitle: 'Most common source' },
      { title: 'Top Device', value: topDevice, subtitle: 'Most common device' },
    ];
  }, [analytics]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BarChartIcon sx={{ fontSize: 36, color: 'primary.main', mr: 1 }} />
          <Typography variant="h4" component="h1">
            Link Analytics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {RANGE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              size="small"
              variant={range === option.value ? 'contained' : 'outlined'}
              onClick={() => setRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {summaryStats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <AnalyticsMetricCard title={stat.title} value={stat.value} subtitle={stat.subtitle} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <AnalyticsChartCard title="Clicks Over Time" subtitle="Daily activity for this link">
                {analytics.clicksOverTime.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={analytics.clicksOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="clicks" stroke="#1976d2" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography color="text.secondary">No click data is available for this range.</Typography>
                )}
              </AnalyticsChartCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <AnalyticsChartCard title="Browser Breakdown" subtitle="Most common browsers">
                {analytics.browserBreakdown.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={analytics.browserBreakdown} dataKey="count" nameKey="browser" outerRadius={90}>
                        {analytics.browserBreakdown.map((entry, index) => (
                          <Cell key={`${entry.browser}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography color="text.secondary">No browser data available.</Typography>
                )}
              </AnalyticsChartCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <AnalyticsChartCard title="Device Breakdown" subtitle="Desktop, mobile, and tablet usage">
                {analytics.deviceBreakdown.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={analytics.deviceBreakdown} dataKey="count" nameKey="device" outerRadius={90}>
                        {analytics.deviceBreakdown.map((entry, index) => (
                          <Cell key={`${entry.device}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography color="text.secondary">No device data available.</Typography>
                )}
              </AnalyticsChartCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <AnalyticsChartCard title="Top Referrers" subtitle="Highest traffic sources">
                {analytics.topReferrers.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={analytics.topReferrers} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" allowDecimals={false} />
                      <YAxis type="category" dataKey="referrer" width={120} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#2e7d32" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography color="text.secondary">No referrer data available.</Typography>
                )}
              </AnalyticsChartCard>
            </Grid>
            <Grid item xs={12}>
              <AnalyticsChartCard title="Recent Click Activity" subtitle="Latest visits recorded for this link">
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Referrer</TableCell>
                        <TableCell>Browser</TableCell>
                        <TableCell>Device</TableCell>
                        <TableCell>Country</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {analytics.recentClicks.length > 0 ? (
                        analytics.recentClicks.map((click, index) => (
                          <TableRow key={`${click.timestamp}-${index}`}>
                            <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                            <TableCell>{click.referrer}</TableCell>
                            <TableCell>{click.browser}</TableCell>
                            <TableCell>{click.device}</TableCell>
                            <TableCell>{click.country}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">No recent clicks yet.</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AnalyticsChartCard>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Analytics;
