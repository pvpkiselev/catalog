import { render, screen, waitFor } from '@testing-library/react';
import SearchInput from '@/components/search/search-input';
import userEvent from '@testing-library/user-event';

const mockDispatch = jest.fn();
jest.mock('@/store/store', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('SearchInput Component', () => {
  test('renders the search input field', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('updates local query on input change', async () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(inputElement, 'test query');

    expect(inputElement).toHaveValue('test query');
  });

  test('shows and hides the reset button based on input', async () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(/search/i);

    expect(screen.queryByTestId('reset-button')).not.toBeInTheDocument();

    await userEvent.type(inputElement, 'test query');

    await waitFor(() => {
      expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId('reset-button'));

    expect(inputElement).toHaveValue('');
    await waitFor(() => {
      expect(screen.queryByTestId('reset-button')).not.toBeInTheDocument();
    });
  });

  test('dispatches action on input change', async () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(input, 'test query');

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'search/changedSearchQuery',
        payload: 'test query',
      });
    });
  });
});
