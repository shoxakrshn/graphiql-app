import React, { PropsWithChildren, useState } from 'react';
import { LocalizationContext } from './LocalizationContext';
import en from '../../localization/en.json';
import ru from '../../localization/ru.json';

type LocalesType = {
  [key: string]: string;
};

const LocalizationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const translations: Record<string, LocalesType> = { en, ru };

  const t = (key: string) => translations[language][key] || key;

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
