import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth-slice';
import { filtersReducer } from './filters/filters-slice';
import { basketReducer } from './basket/basket-slice';

const appReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  basket: basketReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
