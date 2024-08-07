import { Config, fetchData } from './axiosConfig';
import { fetchErrors } from './constants';
import { UserAuth } from './models';
import { resources } from './resources';

const fetchAuthentication = async (email: string, password: string): Promise<UserAuth> => {
  const { auth, login } = resources.auth;
  const url = `${auth}/${login}`;

  const data = {
    email,
    password,
  };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };

  try {
    return await fetchData<UserAuth>(config);
  } catch (error) {
    console.error(fetchErrors.authentication, error);
    throw error;
  }
};

export default fetchAuthentication;
