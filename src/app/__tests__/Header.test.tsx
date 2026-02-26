import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../../widgets';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';
import { StoreProvider } from '../store/StoreProvider';
import { MemoryRouter } from 'react-router-dom';

test('renders Header with logo and buttons', () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <LocalizationProvider>
          <Header />
        </LocalizationProvider>
      </StoreProvider>
    </MemoryRouter>,
  );

  const navMenu = screen.getByTestId('nav-menu');
  const logoElement = screen.getByAltText('Logo');
  const signInBtn = screen.getByText('Sign In');
  const signUpBtn = screen.getByText('Sign Up');
  const enRuBtn = screen.getByText('ru');

  expect(navMenu).toBeInTheDocument();
  expect(logoElement).toBeInTheDocument();
  expect(signInBtn).toBeInTheDocument();
  expect(signUpBtn).toBeInTheDocument();
  expect(enRuBtn).toBeInTheDocument();
});

test('renders sticky header when scrolled', () => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <LocalizationProvider>
          <Header />
        </LocalizationProvider>
      </StoreProvider>
    </MemoryRouter>,
  );

  const headerElement = screen.getByTestId('header');

  window.scrollY = 100;
  fireEvent.scroll(window);

  expect(headerElement).toHaveClass('scrolled');
});
