import { Config, fetchData } from './axiosConfig';
import { fetchErrors } from './constants';
import { UserResponse } from './models';
import { resources } from './resources';

const getUserSession = async (token: string): Promise<UserResponse> => {
  const { auth, profile } = resources.auth;
  const url = `${auth}/${profile}`;

  const config: Config = {
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return await fetchData<UserResponse>(config);
  } catch (error) {
    console.error(fetchErrors.user_session, error);
    throw error;
  }
};

export default getUserSession;
