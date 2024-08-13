import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import AuthModal from '../../auth/auth-modal';

const labels = {
  name: 'Name',
  email: 'Email address',
  password: 'Password',
};

const values = {
  name: 'Vasiliy',
  email: 'Xs9Xh@example.com',
  password: '123456',
};

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

    expect(screen.getByLabelText(new RegExp(labels.name, 'i'))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(labels.email, 'i'))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(labels.password, 'i'))).toBeInTheDocument();
  });

  it('renders the sign-in form correctly', () => {
    render(<AuthModal {...defaultProps} isRegistered />, { wrapper: BrowserRouter });

    expect(screen.queryByLabelText(new RegExp(labels.name, 'i'))).toBeNull();
    expect(screen.getByLabelText(new RegExp(labels.email, 'i'))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(labels.password, 'i'))).toBeInTheDocument();
  });

  it('input credentials', async () => {
    render(<AuthModal {...defaultProps} />, { wrapper: BrowserRouter });

    await userEvent.type(screen.getByLabelText(new RegExp(labels.name, 'i')), values.name);
    await userEvent.type(screen.getByLabelText(new RegExp(labels.email, 'i')), values.email);
    await userEvent.type(screen.getByLabelText(new RegExp(labels.password, 'i')), values.password);

    expect((screen.getByLabelText(new RegExp(labels.name, 'i')) as HTMLInputElement).value).toBe(
      values.name
    );
    expect((screen.getByLabelText(new RegExp(labels.email, 'i')) as HTMLInputElement).value).toBe(
      values.email
    );
    expect(
      (screen.getByLabelText(new RegExp(labels.password, 'i')) as HTMLInputElement).value
    ).toBe(values.password);
  });

  it('calls onSubmit with correct values', async () => {
    render(<AuthModal {...defaultProps} />, { wrapper: BrowserRouter });

    await userEvent.type(screen.getByLabelText(new RegExp(labels.name, 'i')), values.name);
    await userEvent.type(screen.getByLabelText(new RegExp(labels.email, 'i')), values.email);
    await userEvent.type(screen.getByLabelText(new RegExp(labels.password, 'i')), values.password);
    await userEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: values.name,
      email: values.email,
      password: values.password,
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
