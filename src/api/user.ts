import axios from 'axios';
import { ErrorI, UserSignInInfoI, UserSignUpInfoI, UserUpdateI } from '../types';

export const isUserExists = async (field: string, value: string) => {
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/check`, { params: { [field]: value } });
  return result.data as boolean;
};

export const signUpUser = async (body: UserSignUpInfoI) => {
  await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, body);
};

export const signInUser = async (body: UserSignInInfoI) => {
  const result = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, body, {
    validateStatus: (status) => status < 500
  });
  if (result.status !== 200) {
    return {
      status: result.status,
      message: result.data
    };
  }
  return result.data;
};

export const updateUser = async (body: UserUpdateI, token: string): Promise<ErrorI | undefined> => {
  const result = await axios.put(`${process.env.REACT_APP_API_URL}/user/update`, body, {
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: (status) => status < 500
  });
  if (result.status !== 201) {
    return {
      status: result.status,
      message: result.data
    };
  }
};

export const authUser = async (token: string): Promise<ErrorI | undefined> => {
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/update`, {
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: (status) => status < 500
  });
  if (result.status === 403 || result.status === 401) {
    return {
      status: result.status,
      message: result.data
    };
  }
};
