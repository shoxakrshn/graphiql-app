import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useNavigate } from 'react-router-dom';
import { Document } from '../../app/assets/icons/Document';
import { Play } from '../../app/assets/icons/Play';
import { selectIsUser } from '../../app/store/slices/authSlices';
import { HeadersEditor, QueryEditor, ResultPanel, VariableEditor } from '../../shared/ui';
import { getSchema } from '../../shared/utils/getSchema';
import styles from './Editor.module.scss';
import { getAPI } from '../../shared/utils/getApi';

const Editor = () => {
  const [tab, setTab] = useState<'variables' | 'headers'>('variables');
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [headers, setHeaders] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const navigate = useNavigate();
  const isUser = useSelector(selectIsUser);

  useEffect(() => {
    if (!isUser) {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    getSchema('https://rickandmortyapi.com/graphql');
  }, []);

  const onHeaderClickHandler = () => {
    setTab('headers');
  };

  const onVariablesClickHandler = () => {
    setTab('variables');
  };

  const onPlayHandler = async () => {
    const request = await getAPI(
      'https://rickandmortyapi.com/graphql',
      query,
      variables && JSON.parse(variables),
      headers && JSON.parse(headers),
    );
    setResponse(JSON.stringify(request));
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={80}>
            <div className="h-full relative">
              <QueryEditor setQuery={setQuery} />
              <div className={styles.buttonsContainer}>
                <button onClick={onPlayHandler} className="h-10 w-10 rounded-xl bg-fuchsia-500 p-2">
                  <Play className="fill-white" />
                </button>
                <button className="h-10 w-10 rounded-xl bg-fuchsia-500 p-2">
                  <Document />
                </button>
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className={'flex justify-between border-t-2 p-2'}>
            <div className="flex cursor-default space-x-2 text-deepsea transition-all dark:text-sky">
              <span
                onClick={onVariablesClickHandler}
                className={cn(styles.tab, {
                  [styles.tabActive]: tab === 'variables',
                })}
              >
                variables
              </span>
              <span
                onClick={onHeaderClickHandler}
                className={cn(styles.tab, {
                  [styles.tabActive]: tab === 'headers',
                })}
              >
                headers
              </span>
            </div>
          </PanelResizeHandle>
          <Panel defaultSize={20}>
            {tab === 'variables' ? (
              <VariableEditor setVariables={setVariables} value={variables} />
            ) : (
              <HeadersEditor setHeaders={setHeaders} value={headers} />
            )}
          </Panel>
        </PanelGroup>
      </div>
      <div className={styles.leftColumn}>
        <ResultPanel repsonse={response} />
      </div>
    </div>
  );
};

export default Editor;
