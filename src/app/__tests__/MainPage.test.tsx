import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../../pages/Main';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

type RootState = {
  auth: {
    isUser: boolean;
    userEmail: string;
    expirationTimeToken: string;
  };
};

const mockStore = configureMockStore<RootState>();
const store = mockStore({
  auth: {
    isUser: false,
    userEmail: '',
    expirationTimeToken: '',
  },
});

describe('Main component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </LocalizationProvider>
      </Provider>,
    );
  });

  it('renders the welcome message', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LocalizationProvider>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </LocalizationProvider>
      </Provider>,
    );
    const welcomeMessage = getByText('Welcome');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders the start button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LocalizationProvider>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </LocalizationProvider>
      </Provider>,
    );
    const startButton = getByText('Get started');
    expect(startButton).toBeInTheDocument();
  });

  it('renders team members with their information', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LocalizationProvider>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </LocalizationProvider>
      </Provider>,
    );
    const shohaInfo = getByText('Shoha');
    const lizaInfo = getByText('Liza');
    const shahzodInfo = getByText('Shahzod');

    expect(shohaInfo).toBeInTheDocument();
    expect(lizaInfo).toBeInTheDocument();
    expect(shahzodInfo).toBeInTheDocument();
  });
});
