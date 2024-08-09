import { createAsyncThunk } from '@reduxjs/toolkit';

import getSearchResults from '@/api/get-search-results';

export const getSearchResultsThunk = createAsyncThunk(
  'search/getSearchResults',
  async ({ searchQuery }: { searchQuery: string }) => {
    return await getSearchResults(searchQuery);
  }
);
