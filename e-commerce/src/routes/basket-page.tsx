import { Container, Stack, Typography } from '@mui/material';

import BasketCard from '@/components/basket/basket-card';
import ButtonLink from '@/components/common/button-link';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import useBasket from '@/hooks/use-basket';
import { selectBasketTotalPrice } from '@/store/basket/basket-selectors';
import { useAppSelector } from '@/store/store';

function BasketPage() {
  const { basketItems, checkoutBasket } = useBasket();
  const totalPrice = useAppSelector(selectBasketTotalPrice);
  const isBasketEmpty = basketItems.length === 0;

  const handleCheckoutClick = () => {
    checkoutBasket();
  };

  const findCurrentProduct = (id: number) => {
    const currentProduct = basketItems.find((item) => item.id === id);
    return currentProduct ?? null;
  };

  return (
    <Container maxWidth="md" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      {isBasketEmpty ? (
        <Stack
          alignItems="center"
          justifyContent="space-between"
          paddingInline={4}
          paddingBlock={6}
          bgcolor={GRAY_BG}
          borderRadius={BORDER_RADIUS_M}
          gap={4}
        >
          <Typography fontSize="40px" variant="h1" component="h1">
            No products in Basket
          </Typography>
          <ButtonLink to="/">Go To Home</ButtonLink>
        </Stack>
      ) : (
        <Stack gap={6} width="100%" pb={10}>
          <Typography fontSize="40px" variant="h2" component="h1">
            Shopping Basket
          </Typography>
          <Stack direction="row" gap={6} width="100%" flexWrap="wrap">
            <Stack gap={6} minWidth={288} flexGrow={1} flexShrink={1} flexBasis={0}>
              {basketItems.map((product) => (
                <BasketCard key={product.id} product={findCurrentProduct(product.id)} />
              ))}
            </Stack>
            <Stack
              bgcolor={GRAY_BG}
              justifyContent="space-between"
              borderRadius={BORDER_RADIUS_M}
              paddingInline={4}
              paddingBlock={6}
              flexGrow={1}
              minWidth={200}
              maxWidth={{ xs: '100%', sm: 200 }}
              height="fit-content"
              gap={4}
            >
              <Stack direction="row" justifyContent="space-between" gap={4}>
                <Typography variant="h2" component="h2">
                  Total
                </Typography>
                <Typography variant="h2" color="primary">
                  ${totalPrice}
                </Typography>
              </Stack>
              <ButtonLink to="/checkout" onClick={handleCheckoutClick} fullWidth>
                To Checkout
              </ButtonLink>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}

export default BasketPage;
