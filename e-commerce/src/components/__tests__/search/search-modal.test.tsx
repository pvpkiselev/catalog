import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppState } from '@/store/store';
import SearchModal from '@/components/search/search-modal';
import { changedModalStatus } from '@/store/search/search-slice';

const returnOpenValue = 'open';
const returnCloseValue = 'close';
const searchTestId = 'search-modal';
const closeBtnTestId = 'close-button';

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
    mockSelector.mockReturnValue(returnOpenValue);
    render(<SearchModal />);

    await waitFor(() => {
      const modal = screen.getByTestId(searchTestId);
      expect(modal).toBeInTheDocument();
    });
  });

  test('modal close on CloseButton click', async () => {
    mockSelector.mockReturnValue(returnOpenValue);
    const { rerender } = render(<SearchModal />);

    await waitFor(() => {
      const modal = screen.getByTestId(searchTestId);
      expect(modal).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId(closeBtnTestId);
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(changedModalStatus(returnCloseValue));
    });

    mockSelector.mockReturnValue(returnCloseValue);
    rerender(<SearchModal />);

    await waitFor(() => {
      const modal = screen.queryByTestId(searchTestId);
      expect(modal).not.toBeInTheDocument();
    });
  });
});
