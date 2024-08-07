import { Product } from '@/api/models';
import AddToBasketButton from '@/components/common/add-to-basket-button';
import GoBackButton from '@/components/common/go-back-button';
import ImageSlider from '@/components/common/sliders/image-slider/image-slider';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

function ProductPage() {
  const product = useLoaderData() as Product;

  const { title, price, category, images, description } = product;

  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <ImageSlider images={images} />
        </Grid>

        <Grid item xs={12} md={6} gap={6}>
          <Stack spacing={6}>
            <Box maxWidth={200}>
              <GoBackButton color="inherit" variant="text" />
            </Box>

            <Typography component="h1" variant="h2">
              {title}
            </Typography>
            <Typography variant="h2" color="primary">{`$ ${price}`}</Typography>
            <AddToBasketButton product={product} />
            <Typography>Category: {category.name}</Typography>
            <Typography>{description}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage;
