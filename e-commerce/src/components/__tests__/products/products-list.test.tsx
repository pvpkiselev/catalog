import ProductsList from '@/components/catalog/products/products-list';
import { renderWithProviders } from '@/utils/test-utils';
import { screen } from '@testing-library/react';
import { mockFiltersState } from './mock';

test('render loading state', () => {
  renderWithProviders(<ProductsList />, {
    preloadedState: {
      filters: mockFiltersState,
    },
  });

  expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
});
