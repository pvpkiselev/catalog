import { selectBasketTotalCount } from '@/store/basket/basket-selectors';
import { useAppSelector } from '@/store/store';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function BasketButton() {
  const basketTotalCount = useAppSelector(selectBasketTotalCount);

  return (
    <Link to="/basket" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Badge badgeContent={basketTotalCount} color="primary">
        <IconButton size="large" aria-label="login">
          <ShoppingCart fontSize="inherit" />
        </IconButton>
      </Badge>
    </Link>
  );
}

export default BasketButton;