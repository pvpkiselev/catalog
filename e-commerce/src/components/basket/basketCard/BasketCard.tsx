import { Product } from '@/api/models';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import useBasket from '@/hooks/useBasket';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import BasketCounter from '../basketCounter/BasketCounter';

interface BasketCardProps {
  product: Product;
}

function BasketCard({ product }: BasketCardProps) {
  const { basketItems } = useBasket();

  const { images, title, category, price, id } = product;

  const currentProduct = basketItems.find((item) => item.id === id);
  const totalProductPrice = currentProduct ? currentProduct.price * currentProduct.count : 0;
  const currentProductCount = currentProduct ? currentProduct.count : 0;
  const isProductExist = currentProductCount !== 0;

  return (
    isProductExist && (
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          borderRadius: BORDER_RADIUS_M,
          maxWidth: '100%',
          minWidth: '240px',
          flexGrow: 1,
          paddingInline: 4,
          paddingBlock: 6,
          backgroundColor: GRAY_BG,
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
          <CardContent sx={{ minWidth: 288, padding: '0px !important', flexGrow: 1 }}>
            <Stack gap={1}>
              <Typography variant="body1">{title}</Typography>
              <Typography variant="body2">Category: {category.name}</Typography>
            </Stack>
          </CardContent>
          <Stack direction="row" flexGrow={1}>
            <BasketCounter id={id} />
            <CardContent sx={{ width: '100%', padding: '0px !important' }}>
              <Stack gap={2} alignItems="right" textAlign={{ xs: 'left', sm: 'right' }}>
                <Typography variant="body2">for one: ${price}</Typography>
                <Typography fontWeight={700}>${totalProductPrice}</Typography>
              </Stack>
            </CardContent>
          </Stack>
        </Stack>
      </Card>
    )
  );
}

export default BasketCard;
