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
  setHeaders: Dispatch<React.SetStateAction<string>>;
  value: string;
};

export const HeadersEditor = ({ setHeaders, value }: PropsType) => {
  const onChange = useCallback((val: string) => {
    setHeaders(val);
  }, []);

  return (
    <CodeMirror
      value={value}
      height="100%"
      className="h-full"
      theme={materialLightInit(options)}
      // extensions={[javascript({ jsx: true, typescript: true }), tsxLanguage, autoCloseTags]}
      extensions={[langs.json()]}
      onChange={onChange}
    />
  );
};
