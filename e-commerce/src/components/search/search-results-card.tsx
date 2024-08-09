import { Product } from '@/api/models';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import { changedModalStatus } from '@/store/search/search-slice';
import { useAppDispatch } from '@/store/store';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface SearchResultsCardProps {
  product: Product | null;
}

function SearchResultsCard({ product }: SearchResultsCardProps) {
  const dispatch = useAppDispatch();
  if (!product) {
    return null;
  }

  const { images, title, id, price } = product;

  const handleGoToProductPage = () => {
    dispatch(changedModalStatus('close'));
  };

  return (
    <Link
      to={`/card/${id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        width: '100%',
        height: 'fit-content',
      }}
      onClick={handleGoToProductPage}
    >
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
          <CardMedia
            component="img"
            image={images[0]}
            sx={{ borderRadius: BORDER_RADIUS_M, width: '100px', height: '100px' }}
          />
          <CardContent sx={{ padding: '0px !important', flexGrow: 1 }}>
            <Stack justifyContent="space-between" gap={2}>
              <Typography variant="h4">${price}</Typography>
              <Typography color="gray">{title}</Typography>
            </Stack>
          </CardContent>
          {/* <CardContent sx={{ padding: '0px !important', flexGrow: 0 }}>
          <Stack gap={2} textAlign={{ xs: 'left', sm: 'right' }}>
            <Typography fontWeight={700}> ${totalProductPrice}</Typography>
            <Typography>x{totalProductCount}</Typography>
          </Stack>
        </CardContent> */}
        </Stack>
      </Card>
    </Link>
  );
}

export default SearchResultsCard;
