import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsUser } from '../../app/store/slices/authSlices';

const Editor = () => {
  const navigate = useNavigate();
  const isUser = useSelector(selectIsUser);

  useEffect(() => {
    if (!isUser) {
      navigate('/', { replace: true });
    }
  }, []);

  return <div>Editor Page</div>;
};

export default Editor;
