import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import BasketPage from './routes/basket-page';
import { productPageLoader } from './loaders/product-page-loader';
import ProductPage from './routes/product-page';
import CheckoutPage from './routes/checkout-page';
import AuthPage from './routes/auth-page';
import CatalogPage from './routes/catalog-page';
import HomePage from './routes/home-page';
import './main.scss';
import Root from './routes/root';

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
      <Provider store={setupStore()}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
