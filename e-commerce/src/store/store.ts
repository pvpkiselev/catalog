import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { filtersReducer } from './filters/filtersSlice';
import { basketReducer } from './basket/basketSlice';

const appReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  basket: basketReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
