import { Modal, Box, Container, Stack, Typography, Slide } from '@mui/material';
import SearchResults from './search-results';
import SearchInput from './search-input';
import CloseButton from '../common/close-button';
import { changedModalStatus } from '@/store/search/search-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectSearchModalState } from '@/store/search/search-selectors';

function SearchModal() {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(selectSearchModalState);

  const handleModalClose = () => {
    dispatch(changedModalStatus('close'));
  };

  const isModalOpen = modalState === 'open';

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <Slide direction="down" in={isModalOpen} mountOnEnter unmountOnExit>
        <Box
          width="100vw"
          height="100vh"
          overflow="auto"
          bgcolor="white"
          padding={4}
          data-testid="search-modal"
        >
          <Container maxWidth="md" sx={{ paddingInline: { sm: 4, md: 6 } }}>
            <Stack gap={6}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" gap={4}>
                <Typography component="h1" variant="h2">
                  Search
                </Typography>
                <CloseButton onClose={handleModalClose} />
              </Stack>
              <SearchInput />
              <SearchResults />
            </Stack>
          </Container>
        </Box>
      </Slide>
    </Modal>
  );
}

export default SearchModal;
