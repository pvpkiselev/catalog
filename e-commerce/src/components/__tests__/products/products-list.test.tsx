import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/utils/test-utils';
import ProductsList from '@/components/catalog/products/products-list';
import { mockFiltersState } from './mock';

test('render loading state', () => {
  renderWithProviders(<ProductsList />, {
    preloadedState: {
      filters: mockFiltersState,
    },
  });

  expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
});
