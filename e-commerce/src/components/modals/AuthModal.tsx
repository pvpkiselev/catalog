import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import GoBackButton from '../common/GoBackButton';
import { AuthValues } from '@/helpers/models';
interface AuthModalProps {
  onSubmit: ({ name, email, password }: AuthValues) => void;
  onToggle: () => void;
  isPending: boolean;
  isRegistered: boolean;
  isOpen: boolean;
}

const authTitle = {
  signIn: 'Sign in',
  signUp: 'Sign up',
};

const authContentText = {
  signIn: 'New user?',
  signUp: 'Already have an account?',
};

const authToggleText = {
  signIn: 'Create an account',
  signUp: 'Sign in',
};

const authButtonText = {
  signIn: 'Sign in',
  signUp: 'Sign up',
};

function AuthModal(props: AuthModalProps) {
  const [credentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const { onSubmit, onToggle, isPending, isRegistered, isOpen } = props;
  const title = isRegistered ? authTitle.signIn : authTitle.signUp;
  const dialogContentText = isRegistered ? authContentText.signIn : authContentText.signUp;
  const toggleText = isRegistered ? authToggleText.signIn : authToggleText.signUp;
  const submitButtonText = isRegistered ? authButtonText.signIn : authButtonText.signUp;

  const handleCredentialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value.trim() });
  };

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userName: name, email, password } = credentials;
    onSubmit({ name, email, password });
  };

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: {
          width: { sm: '100%', md: '600px' },
          paddingBlock: { sm: 6, md: 0 },
          paddingInline: { sm: 4, md: 0 },
          gap: 4,
          boxShadow: 'none',
        },
        component: 'form',
        onSubmit: handleAuthSubmit,
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'white',
            opacity: 1,
          },
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <DialogTitle variant="h2" component="h1" sx={{ p: 0 }}>
          {title}
        </DialogTitle>
        <GoBackButton variant="text" />
      </Stack>
      <DialogContent sx={{ p: 0 }}>
        <Stack flexDirection="column" gap={4}>
          <DialogContentText display="flex" gap={2}>
            {dialogContentText}
            <Link onClick={onToggle} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              {toggleText}
            </Link>
          </DialogContentText>
          {!isRegistered && (
            <TextField
              value={credentials.userName}
              size="small"
              name="userName"
              label="Name"
              type="text"
              required
              fullWidth
              onChange={handleCredentialsChange}
            />
          )}
          <TextField
            value={credentials.email}
            size="small"
            name="email"
            label="Email address"
            type="email"
            required
            fullWidth
            onChange={handleCredentialsChange}
          />
          <TextField
            value={credentials.password}
            size="small"
            name="password"
            label="Password"
            type="password"
            required
            fullWidth
            onChange={handleCredentialsChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 0 }}>
        <LoadingButton loading={isPending} variant="contained" type="submit" fullWidth>
          {submitButtonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AuthModal;
