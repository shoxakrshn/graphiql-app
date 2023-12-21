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
};

export const QueryEditor = ({ setQuery }: PropsType) => {
  const onChange = useCallback((val: string) => {
    setQuery(val);
  }, []);

  return (
    <CodeMirror
      height="100%"
      className="h-full"
      theme={materialLightInit(options)}
      extensions={[langs.json()]}
      onChange={onChange}
    />
  );
};
