import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export interface AuthState {
  isUser: boolean;
  userEmail: string | null;
}

interface CheckAuthFulfilledPayload {
  email: string | null;
}

const initialState: AuthState = {
  isUser: false,
  userEmail: null,
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
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isUser = !!action.payload.email;
      state.userEmail = action.payload.email;
    });
  },
});

export default authSlice.reducer;
export const { createAuth, cleanAuth } = authSlice.actions;
