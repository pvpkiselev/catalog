import { Config, fetchData } from './axiosConfig';
import { Product } from './models';
import { resources } from './resources';
import { fetchErrors } from './constants';

const getSearchResults = async (searchQuery: string): Promise<Product[]> => {
  const { products } = resources.filters;
  const url = `${products}`;

  const params = {
    title: searchQuery || null,
  };

  const config: Config = {
    method: 'GET',
    url,
    params,
  };

  try {
    return await fetchData<Product[]>(config);
  } catch (error) {
    console.error(fetchErrors.search_results, error);
    throw error;
  }
};

export default getSearchResults;
