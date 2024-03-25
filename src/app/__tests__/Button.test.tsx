import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../../shared/ui/Button/index';
import { eButtonType } from '../../shared/utils/data';
import { test, expect } from 'vitest';

test('renders button with correct text', () => {
  render(<Button text="Click me" typeButton={eButtonType.Filled} />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
