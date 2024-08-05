import { AppState, createAppSelector } from '../redux';

const selectFiltersState = (state: AppState) => state.filters;

export const selectFiltersStatus = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.status
);

export const selectCategories = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.categories
);

export const selectCurrentCategoryId = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.categoryId
);

export const selectPriceRange = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.priceRange
);

export const selectProducts = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.products
);

export const selectSearchQuery = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.searchQuery
);

export const selectLimit = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.limit
);
