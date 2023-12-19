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
  setVariables: Dispatch<React.SetStateAction<string>>;
  value: string;
};

export const VariableEditor = ({ setVariables, value }: PropsType) => {
  const onChange = useCallback((val: string) => {
    setVariables(val);
  }, []);

  return (
    <CodeMirror
      height="100%"
      value={value}
      className="h-full"
      theme={materialLightInit(options)}
      // extensions={[javascript({ jsx: true, typescript: true }), tsxLanguage, autoCloseTags]}
      extensions={[langs.json()]}
      onChange={onChange}
    />
  );
};
