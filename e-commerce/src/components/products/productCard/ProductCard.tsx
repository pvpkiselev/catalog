import { Card, CardContent, Stack, Typography } from '@mui/material';
import AddToBasketButton from '../../common/AddToBasketButton';
import { Link } from 'react-router-dom';
import { Product } from '@/api/models';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import ImageSlider from '@/components/common/ImageSlider';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { images, title, category, price, id } = product;

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: BORDER_RADIUS_M,
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        paddingInline: 4,
        paddingBlock: 6,
        backgroundColor: GRAY_BG,
      }}
    >
      <Link to={`/card/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Stack gap={2}>
          <ImageSlider images={images} />
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">${price}</Typography>
              <AddToBasketButton product={product} isIconButton={true} />
            </Stack>
          </CardContent>
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack>
              <Typography variant="body1">{title}</Typography>
              <Typography variant="body2">Category: {category.name}</Typography>
            </Stack>
          </CardContent>
        </Stack>
      </Link>
    </Card>
  );
}

export default ProductCard;
