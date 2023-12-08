import React, { ReactNode, useState } from 'react';
import { LocalizationContext } from './LocalizationContext';
import { LocalizationDataType } from './types';

interface LocalizationProviderProps {
  children: ReactNode;
}

const defaultLanguageData = (await import(`../../localization/en.json`)).default;

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [localizationData, setLocalizationData] =
    useState<LocalizationDataType>(defaultLanguageData);

  const updateLanguage = async (newLan: string) => {
    setLanguage(newLan);

    const res = await import(`../../localization/${newLan}.json`);
    const newData = res.default;
    setLocalizationData(newData);
  };

  return (
    <LocalizationContext.Provider value={{ language, updateLanguage, localizationData }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
