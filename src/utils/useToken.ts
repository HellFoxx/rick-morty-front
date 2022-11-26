import { useState } from 'react';

interface useTokenI {
  setToken: (token: string) => void;
  token?: string;
}
export const useToken = () : useTokenI => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString === 'undefined')
      localStorage.removeItem('token');

    let userToken = null;
    if (tokenString !== null)
      userToken = JSON.parse(tokenString);

    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    // localStorage.setItem('token', JSON.stringify(userToken));
    // setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}