import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../src/shared/ui/Button/index';
import React from 'react';
import { eButtonType } from '../src/shared/utils/data';
import { test, expect } from 'vitest';

test('renders button with correct text', () => {
  render(<Button text="Click me" typeButton={eButtonType.Filled} />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
