import { IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';

import useAuth from '@/hooks/use-auth';

function LogoutButton() {
  const { handleLogout } = useAuth();

  return (
    <IconButton size="large" aria-label="logout" onClick={handleLogout}>
      <Logout fontSize="inherit" />
    </IconButton>
  );
}

export default LogoutButton;
