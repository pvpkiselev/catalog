import CheckoutCard from '@/components/checkout/checkout-card';
import ButtonLink from '@/components/common/button-link';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import {
  selectCheckoutItems,
  selectCheckoutTotalCount,
  selectCheckoutTotalPrice,
} from '@/store/basket/basket-selectors';
import { useAppSelector } from '@/store/store';
import { getFormattedDate } from '@/utils/get-formatted-date';
import { Box, Container, Stack, Typography } from '@mui/material';

function CheckoutPage() {
  const checkoutItems = useAppSelector(selectCheckoutItems);
  const totalPrice = useAppSelector(selectCheckoutTotalPrice);
  const totalCount = useAppSelector(selectCheckoutTotalCount);
  const currentDate = getFormattedDate();

  const findCurrentProduct = (id: number) => {
    const currentProduct = checkoutItems.find((item) => item.id === id);
    return currentProduct ?? null;
  };

  return (
    <Container maxWidth="md" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Box>
        <Stack gap={6} width="100%" pb={10}>
          <Stack
            direction="row"
            gap={4}
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography variant="h1" component="h1">
              My order
            </Typography>
            <ButtonLink to="/">Go To Home</ButtonLink>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            paddingInline={4}
            paddingBlock={6}
            bgcolor={GRAY_BG}
            borderRadius={BORDER_RADIUS_M}
          >
            <Stack gap={4}>
              <Typography variant="h2" component="h2">
                {currentDate}
              </Typography>
              <Typography>{totalCount} products</Typography>
            </Stack>
            <Typography variant="h2" color="primary">
              ${totalPrice}
            </Typography>
          </Stack>
          <Stack gap={6} width="100%">
            {checkoutItems.map((product) => (
              <CheckoutCard key={product.id} product={findCurrentProduct(product.id)} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
