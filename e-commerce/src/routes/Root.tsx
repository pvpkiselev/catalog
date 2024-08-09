import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import { useEffect } from 'react';
import useAuth from '@/hooks/use-auth';
import SearchModal from '@/components/search/search-modal';

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
