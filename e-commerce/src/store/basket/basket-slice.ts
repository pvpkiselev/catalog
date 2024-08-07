import { Product } from '@/api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketState {
  basketItems: Product[];
  checkoutItems: Product[];
}

const basketInitialState: BasketState = {
  basketItems: [],
  checkoutItems: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: basketInitialState,
  reducers: {
    addedToBasket(state, action: PayloadAction<Product>) {
      const existingItem = state.basketItems.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.basketItems.push({ ...action.payload, count: 1 });
      }
    },
    removedFromBasket(state, action: PayloadAction<number>) {
      state.basketItems = state.basketItems.filter((item) => item.id !== action.payload);
    },
    increasedItemCount(state, action: PayloadAction<number>) {
      const existingItem = state.basketItems.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.count += 1;
      }
    },
    decreasedItemCount(state, action: PayloadAction<number>) {
      const existingItem = state.basketItems.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.count -= 1;
      }
    },
    basketSet(state, action: PayloadAction<Product[]>) {
      state.basketItems = action.payload;
    },
    checkedOutBasket(state) {
      state.checkoutItems = [...state.basketItems];
      state.basketItems = [];
    },
  },
});

export const {
  addedToBasket,
  removedFromBasket,
  increasedItemCount,
  decreasedItemCount,
  basketSet,
  checkedOutBasket,
} = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
