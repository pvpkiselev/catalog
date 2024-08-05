import { useCallback, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import ProductCard from '../productCard/ProductCard';
import { Alert, Box, Grid, Stack, Typography } from '@mui/material';
import ProductsListSkeleton from './ProductsListSkeleton';
import PaginationButton from '../../filters/paginationButton/PaginationButton';
import {
  selectCurrentCategoryId,
  selectFiltersStatus,
  selectLimit,
  selectPriceRange,
  selectProducts,
  selectSearchQuery,
} from '@/store/filters/filtersSelectors';
import { PRODUCTS_MAX_LIMIT } from '@/helpers/constants';
import { getSortedProductsThunk } from '@/store/filters/filtersThunks';

function ProductsList() {
  const [error, setError] = useState<string | null>(null);

  const searchQuery = useAppSelector(selectSearchQuery);
  const priceRange = useAppSelector(selectPriceRange);
  const categoryId = useAppSelector(selectCurrentCategoryId);
  const limit = useAppSelector(selectLimit);
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectFiltersStatus);
  const dispatch = useAppDispatch();

  const getProductsList = useCallback(async () => {
    setError(null);
    const options = { searchQuery, priceRange, categoryId, limit };
    try {
      await dispatch(getSortedProductsThunk(options));
    } catch (error) {
      setError('Products Fetch Failed');
      console.error(error);
    }
  }, [searchQuery, priceRange, categoryId, limit]);

  useLayoutEffect(() => {
    getProductsList();
  }, [getProductsList]);

  const productsLength = products.length;
  const isProductsEmpty = productsLength === 0;
  const isEndOfList = productsLength % limit !== 0 || productsLength === PRODUCTS_MAX_LIMIT;
  const isLoading = status === 'pending';

  const titleMessage = {
    no_found: 'No products found',
    products: `${productsLength} products`,
  };

  return (
    <Box flex="1">
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Stack gap={6} width="100%">
          <Typography variant="h2" component="h2">
            {isProductsEmpty ? titleMessage.no_found : titleMessage.products}
          </Typography>
          {isLoading ? (
            <ProductsListSkeleton />
          ) : (
            <Grid container spacing={4} wrap="wrap">
              {products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  display="flex"
                  flexDirection="column"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          {!isProductsEmpty && !isEndOfList ? (
            <PaginationButton />
          ) : (
            <Typography textAlign="center">
              {isLoading ? 'Loading…' : 'No more products'}
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
}

export default ProductsList;
