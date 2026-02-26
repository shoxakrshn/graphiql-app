import { render, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import React from 'react';
import Input from '../../shared/ui/Input/index';

test('renders Input component with label, placeholder, and handles input', () => {
  const { getByPlaceholderText } = render(
    <Input type="text" id="testId" label="Test Label" placeholder="Test Placeholder" />,
  );

  const inputElement = getByPlaceholderText('Test Placeholder') as HTMLInputElement;

  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: 'Test Value' } });

  expect(inputElement.value).toBe('Test Value');
});

test('renders Input component with error message', () => {
  const { getByText, getByPlaceholderText } = render(
    <Input type="text" id="testId" placeholder="Test Placeholder" error="Test Error" />,
  );

  const errorElement = getByText('Test Error');
  const inputElement = getByPlaceholderText('Test Placeholder') as HTMLInputElement;

  expect(errorElement).toBeInTheDocument();

  const computedStyles = getComputedStyle(inputElement);

  expect(Object.values(computedStyles).some((value) => value !== '' && value !== 'none')).toBe(
    true,
  );
});
