import { render, screen, waitFor } from '@testing-library/react';
import SearchModal from '@/components/search/search-modal';
import userEvent from '@testing-library/user-event';
import { AppState } from '@/store/store';
import { changedModalStatus } from '@/store/search/search-slice';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock('@/store/store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: AppState) => unknown) => mockSelector(selector),
}));
jest.mock('@/components/search/search-results', () => () => <div>Search Results Mock</div>);

describe('Search Modal Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the search modal', async () => {
    mockSelector.mockReturnValue('open');
    render(<SearchModal />);

    await waitFor(() => {
      const modal = screen.getByTestId('search-modal');
      expect(modal).toBeInTheDocument();
    });
  });

  test('modal close on CloseButton click', async () => {
    mockSelector.mockReturnValue('open');
    const { rerender } = render(<SearchModal />);

    await waitFor(() => {
      const modal = screen.getByTestId('search-modal');
      expect(modal).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('close-button');
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(changedModalStatus('close'));
    });

    mockSelector.mockReturnValue('close');
    rerender(<SearchModal />);

    await waitFor(() => {
      const modal = screen.queryByTestId('search-modal');
      expect(modal).not.toBeInTheDocument();
    });
  });
});
