// Application Constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
export const TOKEN_KEY = 'smartlink_token';
export const USER_KEY = 'smartlink_user';

export const ANALYTICS_RANGES = [
  { label: 'Last 24 hours', value: '1d' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'All time', value: 'all' },
];
