import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TUser = {
  email: string;
  role: 'buyer' | 'seller';
  iat: number;
  exp: number;
  fullName: string;
};
type TInitialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const currentToken = (state: RootState) => state.auth.token;
export const currentUserData = (state: RootState) => state.auth.user;
