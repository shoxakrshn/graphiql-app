import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppLink } from '../src/shared/ui/AppLink/index';
import { eButtonType } from '../src/shared/utils/data';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

test('renders AppLink with correct text and type', () => {
  render(
    <MemoryRouter>
      <AppLink to="/path" typeButton={eButtonType.Filled}>
        Link Text
      </AppLink>
    </MemoryRouter>,
  );

  const linkElement = screen.getByText('Link Text');

  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', '/path');
});
