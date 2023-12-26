import cn from 'classnames';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { useNavigate } from 'react-router-dom';
import { Document } from '../../app/assets/icons/Document';
import { Play } from '../../app/assets/icons/Play';
import { ChevronUp } from '../../app/assets/icons/chevronUp';
import { ChevronDown } from '../../app/assets/icons/chevronDown';
import { selectIsUser } from '../../app/store/slices/authSlices';
import { HeadersEditor, QueryEditor, ResultPanel, VariableEditor } from '../../shared/ui';
import { getSchema } from '../../shared/utils/getSchema';
import styles from './Editor.module.scss';
import { getAPI } from '../../shared/utils/getApi';
import { useAppSelector } from '../../app/store/hooks/hooks';

type TabType = 'variables' | 'headers';

const Editor = () => {
  const [tab, setTab] = useState<TabType>('variables');
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  const [headers, setHeaders] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [url, setUrl] = useState<string>('https://rickandmortyapi.com/graphql');

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const panelRef = useRef<ImperativePanelHandle>(null);

  const navigate = useNavigate();
  const isUser = useAppSelector(selectIsUser);

  useEffect(() => {
    if (!isUser) {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    getSchema(url);
  }, []);

  const onChevronHandler = useCallback(() => {
    panelRef.current?.isExpanded() ? panelRef.current.collapse() : panelRef.current?.expand();
    setIsCollapsed((prev) => !prev);
  }, []);

  const onTabHandler = useCallback(
    (activeTab: TabType) => {
      setTab(activeTab);
      setIsCollapsed(false);
      panelRef.current?.isCollapsed && panelRef.current.expand();
    },
    [tab],
  );

  const onPlayHandler = async () => {
    const request = await getAPI(
      url,
      query,
      variables && JSON.parse(variables),
      headers && JSON.parse(headers),
    );
    setResponse(JSON.stringify(request));
  };

  const onUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    },
    [url],
  );

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={100}>
            <div className="h-full relative">
              <QueryEditor setQuery={setQuery} />
              <div className={styles.buttonsContainer}>
                <button onClick={onPlayHandler} className={styles.sideButtons}>
                  <Play className="fill-white" />
                </button>
                <button className={styles.sideButtons}>
                  <Document />
                </button>
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className={styles.pageResize}>
            <div className="flex items-center gap-2">
              <span
                onClick={() => onTabHandler('variables')}
                className={cn(styles.tab, {
                  [styles.tabActive]: tab === 'variables',
                })}
              >
                variables
              </span>
              <span
                onClick={() => onTabHandler('headers')}
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
            <span onClick={onChevronHandler}>{isCollapsed ? <ChevronUp /> : <ChevronDown />}</span>
          </PanelResizeHandle>
          <Panel minSize={20} collapsible ref={panelRef}>
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
