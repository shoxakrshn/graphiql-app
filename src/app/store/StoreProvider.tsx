import { Provider } from 'react-redux';
import { setupStore } from './store';
import { PropsWithChildren } from 'react';

const store = setupStore();

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
