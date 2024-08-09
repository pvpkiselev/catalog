import getSearchResults from '@/api/get-search-results';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSearchResultsThunk = createAsyncThunk(
  'search/getSearchResults',
  async ({ searchQuery }: { searchQuery: string }) => {
    return await getSearchResults(searchQuery);
  }
);
