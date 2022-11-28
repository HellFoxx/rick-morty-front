import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoI, UserUpdateI } from '../../types';

const initialState: UserInfoI = {
  firstName: null,
  lastName: null,
  nickname: '',
  email: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo: (state, action: PayloadAction<UserInfoI>) => {
      const { lastName, firstName, email, nickname } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.nickname = nickname;
    },
    updateUserInfo: (state, action: PayloadAction<UserUpdateI>) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
    }
  }
});

export const { saveUserInfo, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
