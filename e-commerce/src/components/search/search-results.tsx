import { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Stack, Typography } from '@mui/material';

import SearchResultsCard from './search-results-card';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  selectSearchItems,
  selectSearchQuery,
  selectSearchStatus,
} from '@/store/search/search-selectors';
import { getSearchResultsThunk } from '@/store/search/search-thunks';

function SearchResults() {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const searchItems = useAppSelector(selectSearchItems);
  const searchQuery = useAppSelector(selectSearchQuery);
  const status = useAppSelector(selectSearchStatus);

  const getSearchResults = useCallback(async () => {
    setError(null);
    try {
      await dispatch(getSearchResultsThunk({ searchQuery }));
    } catch (error) {
      setError('Search Failed');
      console.error(error);
    }
  }, [searchQuery]);

  useEffect(() => {
    getSearchResults();
  }, [getSearchResults]);

  const searchItemsLength = searchItems.length;
  const isSearchItemsEmpty = searchItemsLength === 0;
  const isLoading = status === 'pending';

  const titleMessage = {
    loading: 'Loading…',
    no_found: 'No products found',
    products: `${searchItemsLength} products`,
  };

  const currentTitle = isLoading
    ? titleMessage.loading
    : isSearchItemsEmpty
      ? titleMessage.no_found
      : titleMessage.products;

  return (
    <Box flex="1">
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Stack gap={4} maxHeight="auto" overflow="auto">
          <Typography variant="h3" component="h2">
            {currentTitle}
          </Typography>
          <Stack gap={6} width="100%">
            {searchItems.map((item) => (
              <SearchResultsCard key={item.id} product={item} />
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}

export default SearchResults;
