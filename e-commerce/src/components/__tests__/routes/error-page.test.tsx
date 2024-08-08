import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ErrorPage from '@/routes/error-page';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Error page', () => {
  it('render the component', async () => {
    renderWithRouter(<ErrorPage data-testid="error-page" />);

    await screen.findByTestId('error-page');

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });

  it('button redirects to HomePage', () => {
    renderWithRouter(<ErrorPage />);

    const homeButton = screen.getByRole('button', { name: /Go to home/i });
    userEvent.click(homeButton);
    const homeLink = homeButton.closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
  });
});
