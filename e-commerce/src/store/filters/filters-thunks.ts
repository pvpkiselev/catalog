import getCategories from '@/api/get-categories';
import getSortedProducts from '@/api/get-sorted-products';
import { createAppAsyncThunk } from '@/store/redux';

export const getCategoriesThunk = createAppAsyncThunk('filters/getCategories', async () => {
  return await getCategories();
});

export const getSortedProductsThunk = createAppAsyncThunk(
  'filters/getSortedProducts',
  async ({
    searchQuery,
    price_min,
    price_max,
    categoryId,
    limit,
  }: {
    searchQuery: string;
    price_min: number;
    price_max: number;
    categoryId: number | null;
    limit: number;
  }) => {
    return await getSortedProducts({
      searchQuery,
      price_min,
      price_max,
      categoryId,
      limit,
    });
  }
);
