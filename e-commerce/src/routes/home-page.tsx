import { useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';

import ButtonLink from '@/components/common/button-link';
import CardsSlider from '@/components/common/sliders/cards-slider/cards-slider';
import CategoryCard from '@/components/home/category-card';
import useCategories from '@/hooks/use-categories';
import heroImg from '@public/images/hero.jpg';

function HomePage() {
  const { categories, getCategories, changeCategory } = useCategories();

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryChange = (id: number | null) => {
    changeCategory(id);
  };

  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Stack gap={20} pb={10}>
        <Stack direction="row" alignItems="center" gap={6} flexWrap="wrap">
          <Stack gap={6} minWidth="288px" flex={1}>
            <Typography component="h1" variant="h1">
              Take a look at the entire range of products in our catalog
            </Typography>
            <Typography>Filter by price range, categories, search query</Typography>
            <ButtonLink to="/catalog">Explore catalog</ButtonLink>
          </Stack>
          <Box
            component="img"
            flex={1}
            minWidth="288px"
            height="auto"
            margin="0 !important"
            alt="Hero Image"
            src={heroImg}
          />
        </Stack>
        <Stack gap={6} width="100%" pb={10}>
          <Typography variant="h2" component="h2">
            Categories
          </Typography>
          <CardsSlider>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onCategoryChange={handleCategoryChange}
              />
            ))}
          </CardsSlider>
        </Stack>
      </Stack>
    </Container>
  );
}

export default HomePage;
