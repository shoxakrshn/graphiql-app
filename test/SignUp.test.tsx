import { render, fireEvent } from '@testing-library/react';
import LocalizationProvider from '../src/app/context/localizationContext/LocalizationProvider';
import { SignUp } from '../src/pages/SignUp/index';
import { test, expect } from 'vitest';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    isUser: true,
    userEmail: 'test@example.com',
    expirationTimeToken: 'password123',
  },
});

test('renders SignUp component and submits the form successfully', async () => {
  render(
    <Provider store={store}>
      <LocalizationProvider>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </LocalizationProvider>
    </Provider>,
  );

  const nameInput = document.getElementById('name') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.submit(document.querySelector('form') as HTMLFormElement);

  expect(document.location.pathname).toEqual('/');
});
