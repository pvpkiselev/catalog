import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../store';

const selectFiltersState = (state: AppState) => state.filters;

export const selectFiltersStatus = createSelector(
  [selectFiltersState],
  (filtersState) => filtersState.status
);

export const selectCategories = createSelector(
  [selectFiltersState],
  (filtersState) => filtersState.categories
);

export const selectCurrentCategoryId = createSelector(
  [selectFiltersState],
  (filtersState) => filtersState.categoryId
);

export const selectPriceRange = createSelector(
  [selectFiltersState],
  (filtersState) => filtersState.priceRange
);

export const selectProducts = createSelector(
  [selectFiltersState],
  (filtersState) => filtersState.products
);

export const selectLimit = createSelector(
  [selectFiltersState],
  (filtersState) => filtersState.limit
);
