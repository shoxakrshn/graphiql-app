import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageToggler } from '../../shared/ui/LanguageToggler/index';
import { test, expect } from 'vitest';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';

const mockLocalizationProvider = ({ children }) => (
  <LocalizationProvider>{children}</LocalizationProvider>
);

globalThis.LocalizationProvider = mockLocalizationProvider;
globalThis.useLanguage = () => ({ setLanguage: () => {}, language: 'en' });

test('LanguageToggler Component', () => {
  render(
    <LocalizationProvider>
      <LanguageToggler />
    </LocalizationProvider>,
  );

  const toggleButton = screen.getByText('ru');
  expect(toggleButton).toBeInTheDocument();
});
