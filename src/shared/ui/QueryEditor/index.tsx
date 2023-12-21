import CodeMirror from '@uiw/react-codemirror';
import { materialLightInit } from '@uiw/codemirror-theme-material';
import { langs } from '@uiw/codemirror-extensions-langs';
import { Dispatch, useCallback } from 'react';

const options = {
  settings: {
    fontFamily: 'FiraCode',
    lineHighlight: '#FAFAFA',
    background: '#FAFAFA',
    gutterBackground: '#FAFAFA',
  },
};

type PropsType = {
  setQuery: Dispatch<React.SetStateAction<string>>;
  formattedQuery: string;
};

export const QueryEditor = ({ setQuery, formattedQuery }: PropsType) => {
  const onChange = useCallback((val: string) => {
    setQuery(val);
  }, []);

  return (
    <CodeMirror
      height="100%"
      className="h-full"
      value={formattedQuery}
      theme={materialLightInit(options)}
      extensions={[langs.json()]}
      onChange={onChange}
    />
  );
};
