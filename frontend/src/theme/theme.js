// Material UI Custom Theme
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6C63FF', light: '#9D97FF', dark: '#4B45B2', contrastText: '#FFFFFF' },
    secondary: { main: '#00D9A6', light: '#5EFFCD', dark: '#00A87D', contrastText: '#000000' },
    background: { default: '#0A0E1A', paper: '#131829' },
    text: { primary: '#E8E8F0', secondary: '#9CA3AF' },
    error: { main: '#FF6B6B' },
    warning: { main: '#FFB347' },
    success: { main: '#00D9A6' },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, padding: '10px 24px' } } },
    MuiCard: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default theme;
