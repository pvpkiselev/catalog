import { setAxiosAuthToken } from '@/api/axiosConfig';
import { TOKEN_COOKIES } from '@/helpers/constants';
import { logout } from '@/store/auth/auth-slice';
import { checkUserThunk, loginUserThunk, registerUserThunk } from '@/store/auth/auth-thunks';
import { useAppDispatch } from '@/store/store';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const authErrors = {
  login: 'Login error',
  register: 'Register error',
};

function useAuth() {
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await dispatch(loginUserThunk({ email, password })).unwrap();
      const token = response.access_token;
      setAxiosAuthToken(token);
      Cookies.set(TOKEN_COOKIES, token);
      return true;
    } catch (error) {
      toast.error(authErrors.login);
      console.error(error);
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await dispatch(registerUserThunk({ name, email, password })).unwrap();
      const token = response.access_token;
      setAxiosAuthToken(token);
      Cookies.set(TOKEN_COOKIES, token);
      return true;
    } catch (error) {
      toast.error(authErrors.register);
      console.error(error);
    }
  };

  const handleCheckAuth = async () => {
    try {
      const token = Cookies.get(TOKEN_COOKIES);
      if (token) {
        await dispatch(checkUserThunk({ token }));
        setAxiosAuthToken(token);
        Cookies.set(TOKEN_COOKIES, token);
        return true;
      }
    } catch (error) {
      console.error(error);
      dispatch(logout());
    }
  };

  const handleLogout = () => {
    Cookies.remove(TOKEN_COOKIES);
    setAxiosAuthToken(null);
    dispatch(logout());
  };

  return { handleLogin, handleRegister, handleLogout, handleCheckAuth };
}

export default useAuth;
