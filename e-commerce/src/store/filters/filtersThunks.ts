import getCategories from '@/api/getCategories';
import getSortedProducts from '@/api/getSortedProducts';
import { createAppAsyncThunk } from '@/store/redux';

export const getCategoriesThunk = createAppAsyncThunk('filters/getCategories', async () => {
  return await getCategories();
});

export const getSortedProductsThunk = createAppAsyncThunk(
  'filters/getSortedProducts',
  async ({
    searchQuery,
    priceRange,
    categoryId,
    limit,
  }: {
    searchQuery: string;
    priceRange: number[];
    categoryId: number | null;
    limit: number;
  }) => {
    return await getSortedProducts({
      searchQuery,
      priceRange,
      categoryId,
      limit,
    });
  }
);
