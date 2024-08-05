import { Category, Product } from '@/api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAX_PRICE, MIN_PRICE, PRODUCTS_LIMIT } from '@/helpers/constants';
import { getCategoriesThunk, getSortedProductsThunk } from './filtersThunks';

type FiltersState = {
  products: Product[];
  limit: number;
  categories: Category[];
  categoryId: number | null;
  priceRange: number[];
  searchQuery: string;
  status: 'pending' | 'fulfilled' | 'rejected';
};

const filtersInitialState: FiltersState = {
  products: [],
  limit: PRODUCTS_LIMIT,
  categories: [],
  categoryId: null,
  priceRange: [MIN_PRICE, MAX_PRICE],
  searchQuery: '',
  status: 'fulfilled',
};

const filtersSlice = createSlice({
  name: 'auth',
  initialState: filtersInitialState,
  reducers: {
    changedPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
      state.limit = PRODUCTS_LIMIT;
    },
    changedCategoryId(state, action: PayloadAction<number | null>) {
      state.categoryId = action.payload;
      state.limit = PRODUCTS_LIMIT;
    },
    changedSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.limit = PRODUCTS_LIMIT;
    },
    changedLimit(state, action: PayloadAction<number>) {
      state.limit = state.limit + action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.categories = action.payload;
      })
      .addCase(getCategoriesThunk.rejected, (state) => {
        state.status = 'rejected';
      })

      .addCase(getSortedProductsThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getSortedProductsThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.products = action.payload;
      })
      .addCase(getSortedProductsThunk.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const { changedPriceRange, changedCategoryId, changedSearchQuery, changedLimit } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
