import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchInput from '@/components/search/search-input';

const value = 'test query';
const testId = 'reset-button';
const searchPlaceholder = 'Search';

const mockDispatch = jest.fn();
jest.mock('@/store/store', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('SearchInput Component', () => {
  test('renders the search input field', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(new RegExp(searchPlaceholder, 'i'));
    expect(inputElement).toBeInTheDocument();
  });

  test('updates local query on input change', async () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(new RegExp(searchPlaceholder, 'i'));
    await userEvent.type(inputElement, value);

    expect(inputElement).toHaveValue(value);
  });

  test('shows and hides the reset button based on input', async () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(new RegExp(searchPlaceholder, 'i'));

    expect(screen.queryByTestId(testId)).not.toBeInTheDocument();

    await userEvent.type(inputElement, value);

    await waitFor(() => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId(testId));

    expect(inputElement).toHaveValue('');
    await waitFor(() => {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
  });

  test('dispatches action on input change', async () => {
    render(<SearchInput />);

    const input = screen.getByPlaceholderText(new RegExp(searchPlaceholder, 'i'));
    await userEvent.type(input, value);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'search/changedSearchQuery',
        payload: value,
      });
    });
  });
});
