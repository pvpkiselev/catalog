import { render, screen, waitFor } from '@testing-library/react';
import Search from '@/components/catalog/filters/search';
import userEvent from '@testing-library/user-event';

jest.mock('@/store/store', () => ({
  useAppDispatch: () => jest.fn(),
}));

describe('Search Component', () => {
  test('renders the search input field', () => {
    render(<Search />);

    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('updates local query on input change', async () => {
    render(<Search />);

    const inputElement = screen.getByPlaceholderText(/Search/i);
    await userEvent.type(inputElement, 'test query');

    expect(inputElement).toHaveValue('test query');
  });

  test('shows and hides the reset button based on input', async () => {
    render(<Search />);

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
});
