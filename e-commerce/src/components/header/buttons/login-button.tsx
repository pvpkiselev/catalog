import { Link } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function LoginButton() {
  return (
    <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit' }}>
      <IconButton size="large" aria-label="login">
        <Person fontSize="inherit" />
      </IconButton>
    </Link>
  );
}

export default LoginButton;
