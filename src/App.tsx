import { useToken } from './utils/useToken';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ROUTES } from './consts';
import { authRoutes, publicRoutes } from './routes';
import { Header } from './components/header/Header';
import { authUser } from './api/user';

export const App = () => {
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const { PUBLIC, AUTH } = ROUTES;
    if (!window.location.href.includes(PUBLIC.SIGN_IN) && !window.location.href.includes(PUBLIC.SIGN_UP) && !token) {
      navigate(PUBLIC.SIGN_IN, { replace: true });
    } else if (token) {
      authUser(token).then((result) => {
        if (result && (result.status === 401 || result.status === 403)) {
          setToken(undefined);
          navigate(PUBLIC.SIGN_IN, { replace: true });
        }
        navigate(AUTH.HOME, { replace: true });
      });
    }
  }, [token]);

  return (
    <>
      {token && <Header />}
      <Routes>
        {authRoutes.map(({ path, Element }) => (
          <Route path={path} key={path} element={<Element />} />
        ))}
        {publicRoutes.map(({ path, Element }) => (
          <Route path={path} key={path} element={<Element />} />
        ))}
      </Routes>
    </>
  );
};
