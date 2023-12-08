import React, { ReactNode, useState } from 'react';
import { AppContext } from './AppContext';
import { LocalizationDataType } from './types';

interface AppContextProviderProps {
  children: ReactNode;
}

const defaultLanguageData = (await import(`../localization/en.json`)).default;

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [localizationData, setLocalizationData] =
    useState<LocalizationDataType>(defaultLanguageData);

  const updateLanguage = async (newLan: string) => {
    setLanguage(newLan);

    const res = await import(`../localization/${newLan}.json`);
    const newData = res.default;
    setLocalizationData(newData);
  };

  return (
    <AppContext.Provider value={{ language, updateLanguage, localizationData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
