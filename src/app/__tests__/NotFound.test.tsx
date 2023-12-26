import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../pages/NotFound';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';
import { MemoryRouter } from 'react-router-dom';

describe('NotFound component', () => {
  test('renders 404 title and text', () => {
    render(
      <MemoryRouter>
        <LocalizationProvider>
          <NotFound />
        </LocalizationProvider>
      </MemoryRouter>,
    );
    const titleElement = screen.getByText("This page doesn't exist.");
    const textElement = screen.getByText('Go home');

    expect(titleElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  test('renders "Go Home" with correct link', () => {
    render(
      <MemoryRouter>
        <LocalizationProvider>
          <NotFound />
        </LocalizationProvider>
      </MemoryRouter>,
    );
    const linkElement = screen.getByRole('link', { name: 'Go home' });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
    expect(linkElement).toHaveTextContent('Go home');
  });
});
