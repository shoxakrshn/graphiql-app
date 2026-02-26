import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Main from './Main';
import Editor from './Editor';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NotFound from './NotFound';
import SharedLayout from './SharedLayout';

export function getRoutes() {
  return (
    <>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Main />} />
        <Route path="editor" element={<Editor />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  );
}

const AppRouter = () => {
  const routes = createRoutesFromElements(getRoutes());
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRouter;
