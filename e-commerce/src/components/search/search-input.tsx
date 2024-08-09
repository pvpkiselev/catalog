import { TextField, InputAdornment, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close } from '@mui/icons-material';
import { useAppDispatch } from '@/store/store';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { changedSearchQuery } from '@/store/search/search-slice';

function SearchInput() {
  const dispatch = useAppDispatch();
  const [localQuery, setLocalQuery] = useState('');

  const handleSearchQueryDispatch = useDebouncedCallback((query: string) => {
    dispatch(changedSearchQuery(query));
  }, 300);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchQuery = event.currentTarget.value;
    setLocalQuery(currentSearchQuery);
    handleSearchQueryDispatch(currentSearchQuery);
  };

  const handleResetClick = () => {
    setLocalQuery('');
    dispatch(changedSearchQuery(''));
  };

  const isEmptyQuery = localQuery === '';

  return (
    <FormControl sx={{ minWidth: '100%' }}>
      <TextField
        variant="outlined"
        onChange={handleQueryChange}
        value={localQuery}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: !isEmptyQuery && (
            <InputAdornment position="end" onClick={handleResetClick} data-testid="reset-button">
              <Close />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

export default SearchInput;
