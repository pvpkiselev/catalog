import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../store';

const selectSearchState = (state: AppState) => state.search;

export const selectSearchStatus = createSelector([selectSearchState], (state) => state.status);

export const selectSearchQuery = createSelector([selectSearchState], (state) => state.searchQuery);

export const selectSearchItems = createSelector([selectSearchState], (state) => state.searchItems);

export const selectSearchModalState = createSelector(
  [selectSearchState],
  (state) => state.modalState
);
