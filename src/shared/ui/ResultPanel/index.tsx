import CodeMirror from '@uiw/react-codemirror';
import { materialLightInit } from '@uiw/codemirror-theme-material';
import { langs } from '@uiw/codemirror-extensions-langs';

const options = {
  settings: {
    fontFamily: 'FiraCode',
    lineHighlight: '#FFFFFF',
    background: '#FFFFFF',
    gutterBackground: '#FFFFFF',
  },
};

type PropsType = {
  repsonse: string;
};

export const ResultPanel = ({ repsonse }: PropsType) => {
  return (
    <CodeMirror
      value={repsonse}
      basicSetup={{
        lineNumbers: false,
        rectangularSelection: false,
      }}
      readOnly
      height="100%"
      className="h-full"
      theme={materialLightInit(options)}
      // extensions={[javascript({ jsx: true, typescript: true }), tsxLanguage, autoCloseTags]}
      extensions={[langs.json()]}
    />
  );
};
