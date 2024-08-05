import { Product } from '@/api/models';
import useBasket from '@/hooks/useBasket';
import { RemoveShoppingCart, ShoppingCart } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';

interface AddToBasketButtonProps {
  product: Product;
  isIconButton?: boolean;
}

const basketButtonText = {
  remove: 'Remove from basket',
  add: 'Add to basket',
};

function AddToBasketButton({ product, isIconButton }: AddToBasketButtonProps) {
  const { addToBasket, removeFromBasket, isProductInBasket } = useBasket();

  const isInBasket = isProductInBasket(product.id);

  const handleBasketClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isInBasket ? removeFromBasket(product.id) : addToBasket(product);
  };

  return isIconButton ? (
    <IconButton onClick={handleBasketClick}>
      {isInBasket ? <RemoveShoppingCart /> : <ShoppingCart color="primary" />}
    </IconButton>
  ) : (
    <Button
      variant="contained"
      onClick={handleBasketClick}
      startIcon={isInBasket ? <RemoveShoppingCart /> : <ShoppingCart color="inherit" />}
    >
      {isInBasket ? basketButtonText.add : basketButtonText.remove}
    </Button>
  );
}

export default AddToBasketButton;
