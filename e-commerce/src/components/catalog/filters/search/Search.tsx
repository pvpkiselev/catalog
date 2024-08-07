import { useState } from 'react';
import { useAppDispatch } from '@/store/redux';
import { useDebouncedCallback } from 'use-debounce';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Close } from '@mui/icons-material';
import { changedSearchQuery } from '@/store/filters/filtersSlice';

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
          endAdornment: (
            <InputAdornment position="end" onClick={handleResetClick}>
              {!isEmptyQuery && <Close />}
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

export default Search;
