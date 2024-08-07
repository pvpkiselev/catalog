import useAppNavigate from '@/hooks/use-app-navigate';
import { ArrowBack } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';

interface Styles {
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
}

function GoBackButton(props: Styles) {
  const { color = 'primary', variant = 'contained' } = props;
  const { goBack } = useAppNavigate();

  const handleClick = () => {
    goBack();
  };

  return (
    <Button
      color={color}
      variant={variant}
      onClick={handleClick}
      startIcon={<ArrowBack color={color} />}
    >
      Go Back
    </Button>
  );
}

export default GoBackButton;
