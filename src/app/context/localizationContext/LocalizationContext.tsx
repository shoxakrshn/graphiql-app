import { createContext, useContext } from 'react';

type ContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

export const LocalizationContext = createContext<ContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LocalizationContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LocalizationProvider');
  }

  return context;
};
