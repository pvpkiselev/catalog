import { createTheme } from '@mui/material';

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: 40,
      fontWeight: 700,
      color: '#181818',
    },
    h2: {
      fontSize: 24,
      fontWeight: 700,
      color: '#181818',
    },
    h3: {
      fontSize: 20,
      fontWeight: 700,
      color: '#181818',
    },
    h4: {
      fontSize: 18,
      fontWeight: 700,
      color: '#181818',
    },
    h5: {},
    h6: {
      fontSize: 18,
      fontWeight: 400,
      color: '#181818',
    },
    body1: {
      fontSize: 16,
      color: '#404040',
    },
    body2: {
      fontSize: 14,
      color: '#808080',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontSize: 18,
          lineHeight: 1.5,
          textTransform: 'none',
          height: 48,
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: 48,
          borderRadius: 12,
        },
      },
    },
  },
});
