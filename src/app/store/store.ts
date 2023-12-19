import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer, { checkAuth } from './slices/authSlices';

const rootReducer = combineReducers({
  auth: authReducer,
});

export function setupStore(preloadedState?: RootState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });

  store.dispatch(checkAuth());

  return store;
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
