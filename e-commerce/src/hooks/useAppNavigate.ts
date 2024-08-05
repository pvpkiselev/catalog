import { useNavigate } from 'react-router-dom';

function useGoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    const stepBack = -1;
    const isWindowHistory = window.history.length > 1;
    isWindowHistory ? navigate(stepBack) : navigate('/');
  };

  return { goBack };
}

export default useGoBack;
