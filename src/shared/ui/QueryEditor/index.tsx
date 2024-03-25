import CodeMirror from '@uiw/react-codemirror';
import { materialLightInit } from '@uiw/codemirror-theme-material';
import { langs } from '@uiw/codemirror-extensions-langs';
import { Dispatch, useCallback } from 'react';

type PropsType = {
  setQuery?: Dispatch<React.SetStateAction<string>>;
  response?: string;
  readonly?: boolean;
};

export const QueryEditor: React.FC<PropsType> = ({ setQuery, response = '', readonly = false }) => {
  const onChange = useCallback((val: string) => {
    if (setQuery) {
      setQuery(val);
    }
  }, []);

  const options = {
    settings: {
      fontFamily: 'FiraCode',
      lineHighlight: readonly ? '#FFFFFF' : '#FAFAFA',
      background: readonly ? '#FFFFFF' : '#FAFAFA',
      gutterBackground: readonly ? '#FFFFFF' : '#FAFAFA',
    },
  };

  return (
    <CodeMirror
      value={response}
      basicSetup={{
        lineNumbers: !readonly,
        rectangularSelection: !readonly,
      }}
      readOnly={readonly}
      height="100%"
      className="h-full"
      theme={materialLightInit(options)}
      extensions={[langs.json()]}
      onChange={onChange}
    />
  );
};
