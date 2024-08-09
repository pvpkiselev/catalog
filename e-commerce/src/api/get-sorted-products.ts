import { DEFAULT_PRODUCTS_OFFSET } from '@/helpers/constants';
import { Config, fetchData } from './axiosConfig';
import { Product } from './models';
import { resources } from './resources';
import { fetchErrors } from './constants';

export interface GetSortedProducts {
  price_min: number;
  price_max: number;
  categoryId: number | null;
  limit: number;
}

type ProductsParams = {
  price_min: number;
  price_max: number;
  categoryId: number | null;
  offset: number;
  limit: number;
};

const getSortedProducts = async (props: GetSortedProducts): Promise<Product[]> => {
  const { price_min, price_max, categoryId, limit } = props;
  const { products } = resources.filters;
  const url = `${products}`;

  const params: ProductsParams = {
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
