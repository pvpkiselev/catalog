import { AppState, createAppSelector } from '../redux';

const selectBasketState = (state: AppState) => state.basket;

export const selectBasketItems = createAppSelector(
  [selectBasketState],
  (basketState) => basketState.basketItems
);

export const selectBasketTotalCount = createAppSelector([selectBasketState], (basketState) => {
  return basketState.basketItems.reduce((total, item) => {
    const itemCount = Number(item.count);
    if (!isNaN(itemCount) && itemCount > 0) {
      return total + itemCount;
    }
    return total;
  }, 0);
});

export const selectBasketTotalPrice = createAppSelector([selectBasketState], (basketState) => {
  return basketState.basketItems.reduce((total, item) => {
    const price = Number(item.price);
    if (!isNaN(price) && price > 0) {
      return total + price * item.count;
    }
    return total;
  }, 0);
});

export const selectCheckoutItems = createAppSelector(
  [selectBasketState],
  (basketState) => basketState.checkoutItems
);

export const selectCheckoutTotalCount = createAppSelector([selectBasketState], (basketState) => {
  return basketState.checkoutItems.reduce((total, item) => {
    const itemCount = Number(item.count);
    if (!isNaN(itemCount) && itemCount > 0) {
      return total + itemCount;
    }
    return total;
  }, 0);
});

export const selectCheckoutTotalPrice = createAppSelector([selectBasketState], (basketState) => {
  return basketState.checkoutItems.reduce((total, item) => {
    const price = Number(item.price);
    if (!isNaN(price) && price > 0) {
      return total + price * item.count;
    }
    return total;
  }, 0);
});
