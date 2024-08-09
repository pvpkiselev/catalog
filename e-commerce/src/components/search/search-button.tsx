import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '@/store/store';
import { changedModalStatus } from '@/store/search/search-slice';

function SearchButton() {
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    dispatch(changedModalStatus('open'));
  };

  return (
    <IconButton onClick={handleModalOpen} size="large" aria-label="login">
      <SearchIcon fontSize="inherit" />
    </IconButton>
  );
}

export default SearchButton;
