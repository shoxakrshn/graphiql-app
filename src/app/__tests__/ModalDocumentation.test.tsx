import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Modal from './../../shared/ui/ModalDocumentation/index';
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
    isUser: false,
    userEmail: '',
    expirationTimeToken: '',
  },
});

describe('Modal component', () => {
  test('renders Modal component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <LocalizationProvider>
            <Modal isOpen={true} onClose={() => {}} url="dummy-url" />
          </LocalizationProvider>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => expect(screen.queryByText('Loading documentation...')).toBeNull());

    await waitFor(() =>
      expect(screen.queryByText('Error fetching or rendering GraphQL schema.')).toBeNull(),
    );

    const typeNameElement = screen.queryByText('Type1');
    expect(typeNameElement).toBeNull();

    const closeButton = screen.getByAltText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => expect(screen.queryByTestId('modal-overlay')).toBeNull());
  });
});
