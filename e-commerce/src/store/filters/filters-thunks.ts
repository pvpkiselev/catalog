import getCategories from '@/api/get-categories';
import getSortedProducts from '@/api/get-sorted-products';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCategoriesThunk = createAsyncThunk('filters/getCategories', async () => {
  return await getCategories();
});

export const getSortedProductsThunk = createAsyncThunk(
  'filters/getSortedProducts',
  async ({
    price_min,
    price_max,
    categoryId,
    limit,
  }: {
    price_min: number;
    price_max: number;
    categoryId: number | null;
    limit: number;
  }) => {
    return await getSortedProducts({
      price_min,
      price_max,
      categoryId,
      limit,
    });
  }
);
