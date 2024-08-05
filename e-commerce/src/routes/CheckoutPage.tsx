import CheckoutCard from '@/components/checkoutCard.tsx/CheckoutCard';
import ButtonLink from '@/components/common/ButtonLink';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import {
  selectCheckoutItems,
  selectCheckoutTotalCount,
  selectCheckoutTotalPrice,
} from '@/store/basket/basketSelectors';
import { useAppSelector } from '@/store/redux';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { Box, Container, Stack, Typography } from '@mui/material';

function CheckoutPage() {
  const checkoutItems = useAppSelector(selectCheckoutItems);
  const totalPrice = useAppSelector(selectCheckoutTotalPrice);
  const totalCount = useAppSelector(selectCheckoutTotalCount);
  const currentDate = getFormattedDate();

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
              <CheckoutCard key={product.id} product={product} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
