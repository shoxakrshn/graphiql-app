import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../widgets';
import { StoreProvider } from '../../app/store/StoreProvider';

const SharedLayout = () => {
  return (
    <StoreProvider>
      <Header />
      <Outlet />
      <Footer />
    </StoreProvider>
  );
};

export default SharedLayout;
