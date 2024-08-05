const env = import.meta.env;

export const BASE_URL = env.VITE_API_URL as string;
export const DEFAULT_AVATAR_URL = env.VITE_DEFAULT_AVATAR_URL as string;

export const FETCH_DATA_ERROR = 'Fetch Data Error';
export const fetchErrors = {
  authentication: 'Fetch Authentication Error',
  create_user: 'Fetch Create User Error',
  categories: 'Get Categories Error',
  product_by_id: 'Get Product by Id Error',
  sorted_products: 'Get Sorted Products Error',
  user_session: 'Get User Session Error',
};
