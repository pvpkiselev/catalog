import AuthModal from '@/components/modals/AuthModal';
import useAppNavigate from '@/hooks/useAppNavigate';
import useAuth from '@/hooks/useAuth';
import { selectAuthStatus } from '@/store/auth/authSelectors';
import { useAppSelector } from '@/store/redux';
import { useState } from 'react';

function AuthPage() {
  const [isRegistered, setIsRegistered] = useState(true);
  const { handleLogin, handleRegister } = useAuth();
  const { goBack } = useAppNavigate();
  const status = useAppSelector(selectAuthStatus);

  const isPending = status === 'pending';

  const handleToggleModal = () => {
    setIsRegistered(!isRegistered);
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const login = await handleLogin(email, password);
      if (login) {
        goBack();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.userName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const register = await handleRegister(name, email, password);
      if (register) {
        goBack();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actualHandler = isRegistered ? handleLoginSubmit : handleRegisterSubmit;

  return (
    <>
      <AuthModal
        onToggle={handleToggleModal}
        onSubmit={actualHandler}
        isRegistered={isRegistered}
        isPending={isPending}
        isOpen={true}
      />
    </>
  );
}

export default AuthPage;
