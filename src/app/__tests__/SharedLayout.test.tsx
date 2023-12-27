import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SharedLayout from '../../pages/SharedLayout';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';

test('renders SharedLayout with header and footer', () => {
  render(
    <LocalizationProvider>
      <MemoryRouter>
        <SharedLayout />
      </MemoryRouter>
    </LocalizationProvider>,
  );

  const headerElement = screen.getByTestId('header');
  const footerElement = screen.getByTestId('footer');

  expect(headerElement).toBeInTheDocument();
  expect(footerElement).toBeInTheDocument();
});
