import axios, { HttpStatusCode } from 'axios';
import { BASE_URL, FETCH_DATA_ERROR } from './constants';

export interface Config {
  headers?: Record<string, string>;
  method: 'GET' | 'POST';
  url: string;
  data?: unknown;
  params?: Record<string, unknown>;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const fetchData = async <T>(config: Config): Promise<T> => {
  try {
    const response = await axiosInstance(config);

    const isSuccess = response.status === HttpStatusCode.Ok || HttpStatusCode.Created;
    if (isSuccess) {
      return response.data;
    } else {
      throw new Error(FETCH_DATA_ERROR);
    }
  } catch (error) {
    console.error(FETCH_DATA_ERROR, error);
    throw error;
  }
};

const setAxiosAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export { axiosInstance, setAxiosAuthToken };
