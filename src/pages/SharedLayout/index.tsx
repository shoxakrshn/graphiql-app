import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../widgets';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default SharedLayout;
