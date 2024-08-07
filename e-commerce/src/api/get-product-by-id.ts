import { Config, fetchData } from './axiosConfig';
import { fetchErrors } from './constants';
import { Product } from './models';
import { resources } from './resources';

const getProductById = async (id: string): Promise<Product> => {
  const { products } = resources.filters;

  const url = `${products}/${id}`;

  const config: Config = {
    method: 'GET',
    url,
  };

  try {
    return await fetchData<Product>(config);
  } catch (error) {
    console.error(fetchErrors.product_by_id, error);
    throw error;
  }
};

export default getProductById;
