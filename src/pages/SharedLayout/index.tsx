import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../widgets';
import { StoreProvider } from '../../app/store/StoreProvider';

const SharedLayout = () => {
  return (
    <StoreProvider>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </StoreProvider>
  );
};

export default SharedLayout;
