import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface CloseButtonProps {
  onClose: () => void;
}

function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <IconButton size="large" aria-label="login" onClick={onClose} data-testid="close-button">
      <Close fontSize="inherit" />
    </IconButton>
  );
}

export default CloseButton;
