import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, Box, Grid, Stack, Typography } from '@mui/material';

import ProductCard from './product-card';
import PaginationButton from '../filters/pagination-button';
import ProductsListSkeleton from './products-list-skeleton';

import {
  selectCurrentCategoryId,
  selectFiltersStatus,
  selectLimit,
  selectPriceRange,
  selectProducts,
} from '@/store/filters/filters-selectors';
import { PRODUCTS_MAX_LIMIT } from '@/helpers/constants';
import { getSortedProductsThunk } from '@/store/filters/filters-thunks';
import { useAppDispatch, useAppSelector } from '@/store/store';

function ProductsList() {
  const [error, setError] = useState<string | null>(null);

  const priceRange = useAppSelector(selectPriceRange);
  const categoryId = useAppSelector(selectCurrentCategoryId);
  const limit = useAppSelector(selectLimit);
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectFiltersStatus);
  const dispatch = useAppDispatch();

  const getProductsList = useCallback(async () => {
    setError(null);
    const price_min = priceRange[0];
    const price_max = priceRange[1];
    const options = { price_min, price_max, categoryId, limit };
    try {
      await dispatch(getSortedProductsThunk(options));
    } catch (error) {
      setError('Products Fetch Failed');
      console.error(error);
    }
  }, [priceRange, categoryId, limit]);

  useLayoutEffect(() => {
    getProductsList();
  }, [getProductsList]);

  const productsLength = products.length;
  const isProductsEmpty = productsLength === 0;
  const isEndOfList = productsLength % limit !== 0 || productsLength === PRODUCTS_MAX_LIMIT;
  const isLoading = status === 'pending';

  const titleMessage = {
    loading: 'Loading products',
    no_found: 'No products found',
    products: `${productsLength} products`,
  };

  const infoMessage = {
    loading: 'Loading…',
    no_products: 'No more products',
  };

  const currentTitle = isLoading
    ? titleMessage.loading
    : isProductsEmpty
      ? titleMessage.no_found
      : titleMessage.products;

  const isShowPagination = !isProductsEmpty && !isEndOfList;
  const isShowSkeleton = isLoading && isProductsEmpty;

  return (
    <Box flex="1">
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Stack gap={6} width="100%">
          <Typography variant="h2" component="h2">
            {currentTitle}
          </Typography>
          {isShowSkeleton ? (
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

          {isShowPagination ? (
            <PaginationButton />
          ) : (
            <Typography textAlign="center">
              {isLoading ? infoMessage.loading : infoMessage.no_products}
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
}

export default ProductsList;
