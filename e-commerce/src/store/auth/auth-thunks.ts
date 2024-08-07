import { createAppAsyncThunk } from '@/store/redux';
import getUserSession from '@/api/get-user-session';
import fetchAuthentication from '@/api/fetch-authentication';
import fetchCreateUser from '@/api/fetch-create-user';

export const checkUserThunk = createAppAsyncThunk(
  'auth/checkUser',
  async ({ token }: { token: string }) => {
    const userData = await getUserSession(token);
    return { userData };
  }
);

export const loginUserThunk = createAppAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const authResponse = await fetchAuthentication(email, password);
    const { access_token } = authResponse;

    const userData = await getUserSession(access_token);
    return { userData, access_token };
  }
);

export const registerUserThunk = createAppAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const userData = await fetchCreateUser(name, email, password);

    const authResponse = await fetchAuthentication(email, password);
    const { access_token } = authResponse;

    return { userData, access_token };
  }
);
