import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close } from '@mui/icons-material';
import { changedSearchQuery } from '@/store/filters/filters-slice';
import { useAppDispatch } from '@/store/store';

function Search() {
  const dispatch = useAppDispatch();
  const [localQuery, setLocalQuery] = useState('');

  const isEmptyQuery = localQuery === '';

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

export default Search;
