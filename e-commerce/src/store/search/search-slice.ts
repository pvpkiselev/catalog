import { Product } from '@/api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSearchResultsThunk } from './search-thunks';

interface SearchState {
  searchItems: Product[];
  searchQuery: string;
  modalState: 'open' | 'close';
  status: 'pending' | 'fulfilled' | 'rejected';
}

const searchInitialState: SearchState = {
  searchItems: [],
  searchQuery: '',
  modalState: 'close',
  status: 'fulfilled',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    changedSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    changedModalStatus(state, action: PayloadAction<'open' | 'close'>) {
      state.modalState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultsThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getSearchResultsThunk.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.searchItems = action.payload;
      })
      .addCase(getSearchResultsThunk.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const { changedSearchQuery, changedModalStatus } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
