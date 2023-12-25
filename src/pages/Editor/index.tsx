import cn from 'classnames';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useNavigate } from 'react-router-dom';
import { Document } from '../../app/assets/icons/Document';
import { Play } from '../../app/assets/icons/Play';
import { selectIsUser } from '../../app/store/slices/authSlices';
import { HeadersEditor, QueryEditor, ResultPanel, VariableEditor } from '../../shared/ui';
import { getSchema } from '../../shared/utils/getSchema';
import { getAPI } from '../../shared/utils/getApi';
import { convertToPrettier } from '../../shared/utils/functions';
import { AppPrettier } from '../../app/assets/icons/AppPrettier';
import styles from './Editor.module.scss';

const Editor = () => {
  const [tab, setTab] = useState<'variables' | 'headers'>('variables');
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  const [headers, setHeaders] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [url, setUrl] = useState<string>('https://rickandmortyapi.com/graphql');

  const navigate = useNavigate();
  const isUser = useSelector(selectIsUser);

  useEffect(() => {
    if (!isUser) {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    getSchema(url);
  }, []);

  const onHeaderClickHandler = useCallback(() => {
    setTab('headers');
  }, [tab]);

  const onVariablesClickHandler = useCallback(() => {
    setTab('variables');
  }, [tab]);

  const onPlayHandler = async () => {
    const request = await getAPI(
      url,
      query,
      variables && JSON.parse(variables),
      headers && JSON.parse(headers),
    );
    setResponse(convertToPrettier(JSON.stringify(request)));
  };

  const onUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    },
    [url],
  );

  const onPrettierClickHandler = () => {
    setQuery((prevQuery) => convertToPrettier(prevQuery));
    setVariables((prevVariables) => convertToPrettier(prevVariables));
    setHeaders((prevHeaders) => convertToPrettier(prevHeaders));
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={80}>
            <div className="h-full relative">
              <QueryEditor setQuery={setQuery} formattedQuery={query} />
              <div className={styles.buttonsContainer}>
                <button onClick={onPlayHandler} className={styles.sideButtons}>
                  <Play className="fill-white" />
                </button>
                <button className={styles.sideButtons}>
                  <Document />
                </button>
                <button onClick={onPrettierClickHandler} className={styles.sideButtons}>
                  <AppPrettier />
                </button>
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className={styles.pageResize}>
            <div className="flex items-center gap-2">
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
            <label htmlFor="url" className={styles.urlLabel}>
              <input
                value={url}
                onChange={onUrlChange}
                type="text"
                placeholder="URL"
                className={styles.urlInput}
                name="url"
                id="url"
              />
            </label>
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
