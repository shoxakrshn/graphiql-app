import { render, screen, waitFor } from '@testing-library/react';
import LocalizationProvider from '../src/app/context/localizationContext/LocalizationProvider';
import { SignUp } from '../src/pages/SignUp/index';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { auth } from '../src/app/firebase/firebaseConfig';
import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockCreateUserWithEmailAndPassword = test.fn(async (_, email, password) => {
  if (email === 'test@example.com' && password === 'password123') {
    return {};
  } else {
    throw new Error('Mocked error for unsuccessful user creation');
  }
});

const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    isUser: true,
    userEmail: 'test@example.com',
    expirationTimeToken: 'password123',
  },
});

test('renders SignUp component and submits form', async () => {
  createUserWithEmailAndPassword(auth, 'test@example.com', 'password123');

  render(
    <Provider store={store}>
      <LocalizationProvider>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </LocalizationProvider>
    </Provider>,
  );

  const emailInput = screen.getByLabelText('email') as HTMLInputElement;
  const passwordInput = screen.getByLabelText('password') as HTMLInputElement;
  const submitButton = screen.getByText('Sign Up');

  emailInput.value = 'test@example.com';
  passwordInput.value = 'password123';

  submitButton.click();

  await waitFor(() => {
    expect(screen.getByText('success-sing-up')).toBeInTheDocument();

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'test@example.com',
      'password123',
    );
  });
});
