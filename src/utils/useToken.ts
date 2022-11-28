import { useState } from 'react';

interface useTokenI {
  setToken: (token: string | undefined, isSession?: boolean) => void;
  token?: string;
}
export const useToken = (): useTokenI => {
  const removeToken = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  const getToken = () => {
    const tokenValue = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (tokenValue === 'undefined') removeToken();
    let userToken = null;
    if (tokenValue !== null) userToken = JSON.parse(tokenValue);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string | undefined, isSession?: boolean) => {
    if (!userToken) {
      setToken(undefined);
      removeToken();
      return;
    }
    const storage = isSession ? sessionStorage : localStorage;
    storage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  };
};
