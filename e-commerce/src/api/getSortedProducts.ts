import { DEFAULT_PRODUCTS_OFFSET } from '@/helpers/constants';
import { Config, fetchData } from './axiosConfig';
import { Product } from './models';
import { resources } from './resources';
import { fetchErrors } from './constants';

export interface GetSortedProducts {
  searchQuery?: string;
  priceRange: number[];
  categoryId: number | null;
  limit: number;
}

type ProductsParams = {
  title: string | null;
  price_min: number;
  price_max: number;
  categoryId: number | null;
  offset: number;
  limit: number;
};

const getSortedProducts = async (props: GetSortedProducts): Promise<Product[]> => {
  const { searchQuery, priceRange, categoryId, limit } = props;
  const { products } = resources.filters;
  const url = `${products}`;

  const price_min = priceRange[0];
  const price_max = priceRange[1];

  const params: ProductsParams = {
    title: null,
    price_min,
    price_max,
    categoryId: null,
    offset: DEFAULT_PRODUCTS_OFFSET,
    limit,
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }

  if (searchQuery) {
    params.title = searchQuery;
  }

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  try {
    return await fetchData<Product[]>(config);
  } catch (error) {
    console.error(fetchErrors.sorted_products, error);
    throw error;
  }
};

export default getSortedProducts;
