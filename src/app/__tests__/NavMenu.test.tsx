import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavMenu } from '../../shared/ui/NavMenu/index';
import { test, expect } from 'vitest';
import { act } from 'react-dom/test-utils';
import LocalizationProvider from '../../app/context/localizationContext/LocalizationProvider';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

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

test('NavMenu Component', () => {
  render(
    <Provider store={store}>
      <LocalizationProvider>
        <MemoryRouter>
          <NavMenu userStatus={false} layout="desktop" />
        </MemoryRouter>
      </LocalizationProvider>
    </Provider>,
  );

  const signInLink = screen.getByText('Sign In');
  expect(signInLink).toBeInTheDocument();

  act(() => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <MemoryRouter>
            <NavMenu userStatus={true} layout="desktop" email="test@example.com" />
          </MemoryRouter>
        </LocalizationProvider>
      </Provider>,
    );
  });

  const emailElement = screen.getByText('test@example.com');
  expect(emailElement).toBeInTheDocument();
});
