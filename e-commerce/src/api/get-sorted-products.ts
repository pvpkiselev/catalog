import { DEFAULT_PRODUCTS_OFFSET } from '@/helpers/constants';
import { Config, fetchData } from './axiosConfig';
import { Product } from './models';
import { resources } from './resources';
import { fetchErrors } from './constants';

export interface GetSortedProducts {
  searchQuery?: string;
  price_min: number;
  price_max: number;
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
  const { searchQuery, price_min, price_max, categoryId, limit } = props;
  const { products } = resources.filters;
  const url = `${products}`;

  const params: ProductsParams = {
    title: searchQuery || null,
    price_min,
    price_max,
    categoryId: categoryId || null,
    offset: DEFAULT_PRODUCTS_OFFSET,
    limit,
  };

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
