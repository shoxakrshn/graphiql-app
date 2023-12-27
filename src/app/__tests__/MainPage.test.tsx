import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from '../../pages/Main';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';

describe('Main component', () => {
  it('renders without crashing', () => {
    render(
      <LocalizationProvider>
        <Main />
      </LocalizationProvider>,
    );
  });

  it('renders the welcome message', () => {
    const { getByText } = render(
      <LocalizationProvider>
        <Main />
      </LocalizationProvider>,
    );
    const welcomeMessage = getByText('Welcome');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders the start button', () => {
    const { getByText } = render(
      <LocalizationProvider>
        <Main />
      </LocalizationProvider>,
    );
    const startButton = getByText('Get started');
    expect(startButton).toBeInTheDocument();
  });

  it('renders team members with their information', () => {
    const { getByText } = render(
      <LocalizationProvider>
        <Main />
      </LocalizationProvider>,
    );
    const shohaInfo = getByText('Shoha');
    const lizaInfo = getByText('Liza');
    const shahzodInfo = getByText('Shahzod');

    expect(shohaInfo).toBeInTheDocument();
    expect(lizaInfo).toBeInTheDocument();
    expect(shahzodInfo).toBeInTheDocument();
  });
});
