import ButtonLink from '@/components/common/ButtonLink';
import { Box, Typography } from '@mui/material';

function ErrorPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <ButtonLink to="/">Go To Home</ButtonLink>
    </Box>
  );
}

export default ErrorPage;
