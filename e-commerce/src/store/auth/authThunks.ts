import { createAppAsyncThunk } from '@/store/redux';
import fetchAuthentication from '@/api/fetchAuthentication';
import fetchCreateUser from '@/api/fetchCreateUser';
import getUserSession from '@/api/getUserSession';

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
