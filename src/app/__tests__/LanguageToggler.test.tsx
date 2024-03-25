import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageToggler } from '../../shared/ui/LanguageToggler/index';
import { test, expect } from 'vitest';
import LocalizationProvider from '../context/localizationContext/LocalizationProvider';

type MockLocalizationProviderProps = {
  children: ReactNode;
};

type UseLanguageType = {
  setLanguage: () => void;
  language: string;
};

type GlobalWithLocalizationProvider = typeof globalThis & {
  LocalizationProvider: (props: { children: ReactNode }) => JSX.Element;
  useLanguage: () => UseLanguageType;
};

const mockLocalizationProvider = ({ children }: MockLocalizationProviderProps) => (
  <LocalizationProvider>{children}</LocalizationProvider>
);

(globalThis as GlobalWithLocalizationProvider).LocalizationProvider = mockLocalizationProvider;
(globalThis as GlobalWithLocalizationProvider).useLanguage = () => ({
  setLanguage: () => {},
  language: 'en',
});

test('LanguageToggler Component', () => {
  render(
    <LocalizationProvider>
      <LanguageToggler />
    </LocalizationProvider>,
  );

  const toggleButton = screen.getByText('ru');
  expect(toggleButton).toBeInTheDocument();
});
