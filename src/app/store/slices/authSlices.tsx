import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export interface AuthState {
  isUser: boolean;
  userEmail: string | null;
}

const initialState: AuthState = {
  isUser: false,
  userEmail: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createAuth: (state) => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          state.isUser = true;
          state.userEmail = currentUser?.email;
        } else {
          state.isUser = false;
          state.userEmail = null;
        }
      });
    },
    cleanAuth: (state) => {
      state.isUser = false;
      state.userEmail = null;
    },
  },
});

export const { createAuth, cleanAuth } = authSlice.actions;

export default authSlice.reducer;
