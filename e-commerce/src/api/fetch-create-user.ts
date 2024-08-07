import { Config, fetchData } from './axiosConfig';
import { DEFAULT_AVATAR_URL, fetchErrors } from './constants';
import { UserResponse } from './models';
import { resources } from './resources';

const fetchCreateUser = async (
  name: string,
  email: string,
  password: string
): Promise<UserResponse> => {
  const { users } = resources.auth;
  const url = `${users}/`;
  const data = { name, email, password, avatar: DEFAULT_AVATAR_URL };

  const config: Config = {
    method: 'POST',
    url,
    data,
  };

  try {
    return await fetchData<UserResponse>(config);
  } catch (error) {
    console.error(fetchErrors.create_user, error);
    throw error;
  }
};

export default fetchCreateUser;
