import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import Header from '../components/header/header';
import SearchModal from '@/components/search/search-modal';
import useAuth from '@/hooks/use-auth';

export default function Root() {
  const { handleCheckAuth } = useAuth();

  useEffect(() => {
    handleCheckAuth();
  }, []);

  return (
    <Box display="flex" flexDirection="column" width="100%" height="100vh" gap={10}>
      <Toaster position="top-center" />
      <Header />
      <SearchModal />
      <Outlet />
    </Box>
  );
}
