import React from 'react';
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
interface AuthModalProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
  const { onSubmit, onToggle, isPending, isRegistered, isOpen } = props;
  const title = isRegistered ? authTitle.signIn : authTitle.signUp;
  const dialogContentText = isRegistered ? authContentText.signIn : authContentText.signUp;
  const toggleText = isRegistered ? authToggleText.signIn : authToggleText.signUp;
  const submitButtonText = isRegistered ? authButtonText.signIn : authButtonText.signUp;

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
        onSubmit: onSubmit,
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
            <TextField size="small" name="userName" label="Name" type="text" required fullWidth />
          )}
          <TextField
            size="small"
            name="email"
            label="Email address"
            type="email"
            required
            fullWidth
          />
          <TextField
            size="small"
            name="password"
            label="Password"
            type="password"
            required
            fullWidth
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
