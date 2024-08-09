import { Container, Stack } from '@mui/material';

import Filters from '@/components/catalog/filters/filters';
import ProductsList from '@/components/catalog/products/products-list';

function CatalogPage() {
  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} width="100%" pb={10}>
        <Filters />
        <ProductsList />
      </Stack>
    </Container>
  );
}

export default CatalogPage;
