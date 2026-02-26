import React from 'react';
import { render, screen } from '@testing-library/react';
import Editor from './../../pages/Editor/index';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';
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
    isUser: true,
    userEmail: 'test@example.com',
    expirationTimeToken: 'expirationTimeToken',
  },
});

describe('Editor component', () => {
  test('renders Editor component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LocalizationProvider>
            <Editor />
          </LocalizationProvider>
        </MemoryRouter>
      </Provider>,
    );

    const urlInput = screen.getByPlaceholderText('URL');

    expect(urlInput).toHaveValue('https://rickandmortyapi.com/graphql');
  });
});
