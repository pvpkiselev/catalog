import { createSelector } from '@reduxjs/toolkit';

import { AppState } from '../store';

const selectBasketState = (state: AppState) => state.basket;

export const selectBasketItems = createSelector(
  [selectBasketState],
  (basketState) => basketState.basketItems
);

export const selectBasketTotalCount = createSelector([selectBasketState], (basketState) => {
  return basketState.basketItems.reduce((total, item) => {
    const itemCount = Number(item.count);
    if (!isNaN(itemCount) && itemCount > 0) {
      return total + itemCount;
    }
    return total;
  }, 0);
});

export const selectBasketTotalPrice = createSelector([selectBasketState], (basketState) => {
  return basketState.basketItems.reduce((total, item) => {
    const price = Number(item.price);
    if (!isNaN(price) && price > 0) {
      return total + price * item.count;
    }
    return total;
  }, 0);
});

export const selectCheckoutItems = createSelector(
  [selectBasketState],
  (basketState) => basketState.checkoutItems
);

export const selectCheckoutTotalCount = createSelector([selectBasketState], (basketState) => {
  return basketState.checkoutItems.reduce((total, item) => {
    const itemCount = Number(item.count);
    if (!isNaN(itemCount) && itemCount > 0) {
      return total + itemCount;
    }
    return total;
  }, 0);
});

export const selectCheckoutTotalPrice = createSelector([selectBasketState], (basketState) => {
  return basketState.checkoutItems.reduce((total, item) => {
    const price = Number(item.price);
    if (!isNaN(price) && price > 0) {
      return total + price * item.count;
    }
    return total;
  }, 0);
});
