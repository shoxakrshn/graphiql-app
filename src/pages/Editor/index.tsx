import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Editor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTimeToken = localStorage.getItem('expirationTimeToken');

    if (
      !token ||
      !expirationTimeToken ||
      new Date().getTime() >= parseInt(expirationTimeToken, 10)
    ) {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTimeToken');
      navigate('/', { replace: true });
    }
  }, []);

  return <div>Editor Page</div>;
};

export default Editor;
