import { useToken } from './utils/useToken';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/forms/signUp/SignUp';
import { ROUTES } from './consts';
import { authRoutes, publicRoutes } from './routes';

const App = () => {
  const { token, setToken } = useToken()
  const { PUBLIC, AUTH } = ROUTES;

  useEffect(() => {
    if (!window.location.href.includes(PUBLIC.SIGN_IN) && !window.location.href.includes(PUBLIC.SIGN_UP) && !token) {
      window.location.href = PUBLIC.SIGN_IN
    } else if (token) {
      window.location.href = AUTH.HOME;
    }
  }, [token])

  return (
    <Routes>
      {token && authRoutes.map(({ path, Element }) => (
        <Route path={path} key={path} element={<Element/>} />
      ))}
      {publicRoutes.map(({ path, Element }) => (
        <Route path={path} key={path} element={<Element/>} />
      ))}
    </Routes>
  );
}

export default App;
