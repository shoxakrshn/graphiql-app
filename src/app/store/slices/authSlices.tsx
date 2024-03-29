import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { RootState } from '../store';

const storedIsUserString = localStorage.getItem('isUser');
const storedIsUser =
  storedIsUserString !== undefined && storedIsUserString !== null
    ? JSON.parse(storedIsUserString)
    : false;
const storedUserEmail = localStorage.getItem('userEmail');
const storedExpirationTimeToken = localStorage.getItem('expirationTimeToken');

export interface AuthState {
  isUser: boolean;
  userEmail: string | null;
  expirationTimeToken: string | null;
}

interface CheckAuthFulfilledPayload {
  email: string | null;
}

const initialState: AuthState = {
  isUser: storedIsUser || false,
  userEmail: storedUserEmail || null,
  expirationTimeToken: storedExpirationTimeToken || null,
};

export const checkAuth = createAsyncThunk<CheckAuthFulfilledPayload, void>(
  'auth/checkAuth',
  async () => {
    return new Promise<CheckAuthFulfilledPayload>((resolve) => {
      onAuthStateChanged(auth, (user: User | null) => {
        resolve({ email: user?.email || null });
      });
    });
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createAuth: (state, action) => {
      const { payload } = action;
      if (payload && payload.email) {
        state.isUser = true;
        state.userEmail = payload.email;

        localStorage.setItem('isUser', 'true');
        localStorage.setItem('userEmail', payload.email);

        if (payload.expirationTimeToken !== undefined && payload.expirationTimeToken !== null) {
          state.expirationTimeToken = payload.expirationTimeToken;
          localStorage.setItem('expirationTimeToken', payload.expirationTimeToken);
        }
      }
    },
    cleanAuth: (state) => {
      state.isUser = false;
      state.userEmail = null;
      state.expirationTimeToken = null;
      localStorage.removeItem('isUser');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('expirationTimeToken');
    },
  },
});

export default authSlice.reducer;
export const { createAuth, cleanAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsUser = (state: RootState) => selectAuth(state).isUser;
export const selectUserEmail = (state: RootState) => selectAuth(state).userEmail;
export const selectExpirationTimeToken = (state: RootState) =>
  selectAuth(state).expirationTimeToken;
