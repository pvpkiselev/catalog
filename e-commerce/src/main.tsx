import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BasketPage from './routes/BasketPage';
import { productPageLoader } from './loaders/productPageLoader';
import ProductPage from './routes/ProductPage';
import CheckoutPage from './routes/CheckoutPage';
import AuthPage from './routes/AuthPage';
import CatalogPage from './routes/CatalogPage';
import HomePage from './routes/HomePage';
import './main.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'card/:cardId',
        element: <ProductPage />,
        loader: productPageLoader,
      },
      {
        path: 'basket',
        element: <BasketPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
