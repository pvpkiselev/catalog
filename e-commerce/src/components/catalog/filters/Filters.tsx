import { Button, IconButton, Stack, Typography, useMediaQuery, Box, Paper } from '@mui/material';
import Categories from './categories/Categories';
import PriceRange from './priceRange/PriceRange';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { Close } from '@mui/icons-material';
import { theme } from '@/theme/theme';

function Filters() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box flexBasis={{ sm: '100%', md: '200px' }} flexGrow={0} flexShrink={0}>
      {isMobile && (
        <Box>
          <Button
            onClick={handleMobileOpen}
            fullWidth
            variant="contained"
            startIcon={<FilterListIcon />}
          >
            Filters
          </Button>
        </Box>
      )}
      <Paper
        elevation={0}
        sx={{
          display: { xs: mobileOpen ? 'block' : 'none', sm: 'block' },
          position: { xs: 'fixed', sm: 'relative' },
          ...(isMobile && {
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            paddingInline: 4,
            paddingBlock: 6,
            borderRadius: 0,
          }),
        }}
      >
        <Stack rowGap={6}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h2" component="h2">
              Filters
            </Typography>
            {isMobile && (
              <IconButton aria-label="close" onClick={handleMobileClose}>
                <Close />
              </IconButton>
            )}
          </Stack>
          <Categories />
          <PriceRange />
        </Stack>
      </Paper>
    </Box>
  );
}

export default Filters;
