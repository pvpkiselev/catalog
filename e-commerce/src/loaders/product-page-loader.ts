import { LoaderFunctionArgs } from 'react-router-dom';

import getProductById from '@/api/get-product-by-id';

const loaderError = {
  fetch: 'Failed to fetch product',
};

export async function productPageLoader({ params }: LoaderFunctionArgs) {
  try {
    const responseData = await getProductById(params.cardId as string);
    const product = responseData;
    return product;
  } catch (error) {
    console.error(loaderError.fetch, error);
    return null;
  }
}
