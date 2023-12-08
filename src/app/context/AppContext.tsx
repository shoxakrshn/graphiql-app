import { createContext, useContext } from 'react';
import { LocalizationDataType } from './types';

interface AppContextProps {
  language: string;
  updateLanguage: (newData: string) => void;
  localizationData: LocalizationDataType;
}

const AppContext = createContext<AppContextProps | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};

export { AppContext, useAppContext };
