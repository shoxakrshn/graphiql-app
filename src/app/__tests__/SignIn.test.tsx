import { render, fireEvent, waitFor } from '@testing-library/react';
import LocalizationProvider from '../../app/context/localizationContext/LocalizationProvider';
import { test, expect } from 'vitest';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { SignIn } from '../../pages/SignIn/index';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

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

test('renders SignIn component and submits the form successfully', async () => {
  const { getByPlaceholderText, getByRole } = render(
    <Provider store={store}>
      <LocalizationProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </LocalizationProvider>
    </Provider>,
  );

  const emailInput = getByPlaceholderText('E-mail');
  const passwordInput = getByPlaceholderText('Password');

  act(() => {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  });

  await act(async () => {
    fireEvent.submit(getByRole('button', { name: 'Sign In' }));
    await waitFor(() => expect(document.location.pathname).toBe('/'));
  });
});
