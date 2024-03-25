import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Burger } from '../../shared/ui/Burger/index';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

test('Burger Component', () => {
  render(
    <MemoryRouter>
      <Burger>Burger Text</Burger>
    </MemoryRouter>,
  );

  const menuButtonElement = screen.getByRole('button', { name: 'Open Menu' });
  expect(menuButtonElement).toBeInTheDocument();

  expect(menuButtonElement.className).toMatch(/menuButton/);

  fireEvent.click(menuButtonElement);
  const closeButtonElement = screen.getByRole('button', { name: 'Close Menu' });
  fireEvent.click(closeButtonElement);
});
