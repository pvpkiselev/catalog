import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import AuthModal from '../../auth/auth-modal';

describe('AuthModal', () => {
  const mockOnSubmit = jest.fn();
  const mockOnToggle = jest.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onToggle: mockOnToggle,
    isPending: false,
    isRegistered: false,
    isOpen: true,
  };

  it('renders the sign-up form correctly', () => {
    render(<AuthModal {...defaultProps} />, { wrapper: BrowserRouter });

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders the sign-in form correctly', () => {
    render(<AuthModal {...defaultProps} isRegistered />, { wrapper: BrowserRouter });

    expect(screen.queryByLabelText(/Name/i)).toBeNull();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('input credentials', async () => {
    render(<AuthModal {...defaultProps} />, { wrapper: BrowserRouter });

    await userEvent.type(screen.getByLabelText(/Name/i), 'Vasiliy');
    await userEvent.type(screen.getByLabelText(/Email address/i), 'vasya@example.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123');

    expect((screen.getByLabelText(/Name/i) as HTMLInputElement).value).toBe('Vasiliy');
    expect((screen.getByLabelText(/Email address/i) as HTMLInputElement).value).toBe(
      'vasya@example.com'
    );
    expect((screen.getByLabelText(/Password/i) as HTMLInputElement).value).toBe('password123');
  });

  it('calls onSubmit with correct values', async () => {
    render(<AuthModal {...defaultProps} />, { wrapper: BrowserRouter });

    await userEvent.type(screen.getByLabelText(/Name/i), 'Vasiliy');
    await userEvent.type(screen.getByLabelText(/Email address/i), 'vasya@example.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Vasiliy',
      email: 'vasya@example.com',
      password: 'password123',
    });
  });

  it('toggles between sign-in and sign-up', async () => {
    render(<AuthModal {...defaultProps} />, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByText('Sign in'));

    expect(mockOnToggle).toHaveBeenCalled();
  });

  it('shows loading state correctly', () => {
    render(<AuthModal {...defaultProps} isPending />, { wrapper: BrowserRouter });

    expect(screen.getByRole('button', { name: 'Sign up' })).toBeDisabled();
  });
});
