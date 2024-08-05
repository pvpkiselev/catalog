import useBasket from '@/hooks/useBasket';
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

interface BasketCounterProps {
  id: number;
}

function BasketCounter(props: BasketCounterProps) {
  const { basketItems, increaseItemCount, decreaseItemCount, removeFromBasket } = useBasket();
  const { id } = props;

  const currentProduct = basketItems.find((item) => item.id === id);
  const currentProductCount = currentProduct ? currentProduct.count : 0;
  const isRemoveButtonActive = currentProductCount <= 1;

  const handleIncreaseCount = () => {
    increaseItemCount(id);
  };

  const handleDecreaseCount = () => {
    decreaseItemCount(id);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(id);
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={handleDecreaseCount} disabled={isRemoveButtonActive}>
        <Remove />
      </IconButton>
      <Typography fontWeight={700}>{currentProductCount}</Typography>
      <IconButton onClick={handleIncreaseCount}>
        <Add />
      </IconButton>
      <IconButton onClick={handleRemoveFromBasket}>
        <DeleteForever />
      </IconButton>
    </Stack>
  );
}

export default BasketCounter;
