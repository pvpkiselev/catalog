import { Product } from '@/api/models';
import { BORDER_RADIUS_M } from '@/helpers/constants';
import { selectCheckoutItems } from '@/store/basket/basketSelectors';
import { useAppSelector } from '@/store/redux';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface CheckoutCardProps {
  product: Product;
}

function CheckoutCard({ product }: CheckoutCardProps) {
  const checkoutItems = useAppSelector(selectCheckoutItems);

  const { images, title, id } = product;

  const currentProduct = checkoutItems.find((item) => item.id === product.id);
  const totalProductPrice = currentProduct ? currentProduct.price * currentProduct.count : 0;
  const totalProductCount = currentProduct ? currentProduct.count : null;

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        borderRadius: BORDER_RADIUS_M,
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        paddingInline: 4,
      }}
    >
      <Stack direction="row" gap={4} alignItems="center" width="100%" flexWrap="wrap">
        <Link
          to={`/card/${id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          <CardMedia
            component="img"
            image={images[0]}
            sx={{ borderRadius: BORDER_RADIUS_M, width: '100px', height: '100px' }}
          />
        </Link>
        <CardContent sx={{ padding: '0px !important', flexGrow: 1 }}>
          <Typography color="gray">{title}</Typography>
        </CardContent>
        <CardContent sx={{ padding: '0px !important', flexGrow: 0 }}>
          <Stack gap={2} textAlign={{ xs: 'left', sm: 'right' }}>
            <Typography fontWeight={700}> ${totalProductPrice}</Typography>
            <Typography>x{totalProductCount}</Typography>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}

export default CheckoutCard;
