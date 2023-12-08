import { createContext, useContext } from 'react';
import { LocalizationDataType } from './types';

interface LocalizationContextProps {
  language: string;
  updateLanguage: (newData: string) => void;
  localizationData: LocalizationDataType;
}

const LocalizationContext = createContext<LocalizationContextProps | null>(null);

const useLocalizationContext = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalizationContext must be used within a LocalizationContextProvider');
  }
  return context;
};

export { LocalizationContext, useLocalizationContext };
