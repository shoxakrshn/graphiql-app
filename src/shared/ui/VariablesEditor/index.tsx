import CodeMirror from '@uiw/react-codemirror';
import { materialLightInit } from '@uiw/codemirror-theme-material';
import { langs } from '@uiw/codemirror-extensions-langs';

const options = {
  settings: {
    fontFamily: 'FiraCode',
    lineHighlight: '#FAFAFA',
    background: '#FAFAFA',
    gutterBackground: '#FAFAFA',
  },
};

export const VariableEditor = () => {
  //  const [value, setValue] = useState<string>();

  return (
    <CodeMirror
      height="100%"
      className="h-full"
      theme={materialLightInit(options)}
      // extensions={[javascript({ jsx: true, typescript: true }), tsxLanguage, autoCloseTags]}
      extensions={[langs.tsx()]}
    />
  );
};
