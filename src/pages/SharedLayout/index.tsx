import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../widgets';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
