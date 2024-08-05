import useAuth from '@/hooks/useAuth';
import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function LogoutButton() {
  const { handleLogout } = useAuth();

  return (
    <IconButton size="large" aria-label="logout" onClick={handleLogout}>
      <Logout fontSize="inherit" />
    </IconButton>
  );
}

export default LogoutButton;
