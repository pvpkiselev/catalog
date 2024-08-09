import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { authReducer } from './auth/auth-slice';
import { filtersReducer } from './filters/filters-slice';
import { basketReducer } from './basket/basket-slice';
import { searchReducer } from './search/search-slice';

const appReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  basket: basketReducer,
  search: searchReducer,
});

export function setupStore(preloadedState?: Partial<AppState>) {
  return configureStore({
    reducer: appReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}

export type AppState = ReturnType<typeof appReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
