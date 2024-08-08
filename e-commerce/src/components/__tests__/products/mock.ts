import { FiltersState } from '@/store/filters/filters-slice';

export const mockFiltersState: FiltersState = {
  products: [],
  limit: 10,
  categories: [],
  categoryId: null,
  priceRange: [0, 1000],
  searchQuery: '',
  status: 'pending',
};

export const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 100,
    description: 'Description Text',
    category: { id: 1, name: 'Category 1', image: 'Category Image src' },
    images: ['product image src 01', 'product image src 02'],
    count: 1,
  },
  {
    id: 2,
    title: 'Product 2',
    price: 100,
    description: 'Description Text',
    category: { id: 2, name: 'Category 2', image: 'Category Image src' },
    images: ['product image src 01', 'product image src 02'],
    count: 1,
  },
  {
    id: 3,
    title: 'Product 3',
    price: 100,
    description: 'Description Text',
    category: { id: 3, name: 'Category 3', image: 'Category Image src' },
    images: ['product image src 01', 'product image src 02'],
    count: 1,
  },
  {
    id: 4,
    title: 'Product 4',
    price: 100,
    description: 'Description Text',
    category: { id: 4, name: 'Category 4', image: 'Category Image src' },
    images: ['product image src 01', 'product image src 02'],
    count: 1,
  },
];

export const mockFiltersStateWithProducts: FiltersState = {
  products: mockProducts,
  limit: 10,
  categories: [],
  categoryId: null,
  priceRange: [0, 1000],
  searchQuery: '',
  status: 'pending',
};
