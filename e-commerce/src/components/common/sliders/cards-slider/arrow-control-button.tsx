import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface ArrowControlButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  visible: boolean;
}

const ArrowControlButton = (props: ArrowControlButtonProps) => {
  const { direction, onClick, visible } = props;
  const isLeft = direction === 'left';

  if (!visible) return null;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: '-48px',
        [isLeft ? 'left' : 'right']: 0,
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLeft ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
  );
};

export default ArrowControlButton;
