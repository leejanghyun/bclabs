import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Hooks
import { useRouter } from '@/hooks';

// Store
import { setAccessToken } from '@/store';

/**
 * Login Callback Page 컴포넌트
 * @returns Login Callback Page 컴포넌트
 */
const LoginCallback = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const location = useLocation();

  /**
   * 초기화
   */
  useEffect(() => {
    const queryParams = new URLSearchParams(location.hash.replace('#', ''));
    const accessToken = queryParams.get('access_token');

    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }

    history.push('/');
  }, []);

  return <></>;
};

export default LoginCallback;
