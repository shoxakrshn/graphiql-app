import { StoreProvider } from './store/StoreProvider';
import AppRouter from '../pages';

function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
