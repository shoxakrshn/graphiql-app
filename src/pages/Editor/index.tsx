import cn from 'classnames';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Document } from '../../app/assets/icons/Document';
import { Play } from '../../app/assets/icons/Play';
import { ChevronUp } from '../../app/assets/icons/chevronUp';
import { ChevronDown } from '../../app/assets/icons/chevronDown';
import { selectIsUser } from '../../app/store/slices/authSlices';
import { HeadersEditor, QueryEditor, VariableEditor } from '../../shared/ui';
import { getAPI } from '../../shared/utils/getApi';
import { convertToPrettier } from '../../app/prettier/prettierApp';
import { AppPrettier } from '../../app/assets/icons/AppPrettier';
import { useAppSelector } from '../../app/store/hooks/hooks';
import Modal from '../../shared/ui/ModalDocumentation/index';
import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import styles from './Editor.module.scss';

type TabType = 'variables' | 'headers';

const Editor = () => {
  const { t } = useLanguage();
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isUser) {
      navigate('/', { replace: true });
    }
  }, []);

  const onChevronHandler = useCallback(() => {
    isCollapsed ? panelRef.current?.expand() : panelRef.current?.collapse();
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const onTabHandler = useCallback(
    (activeTab: TabType) => {
      setTab(activeTab);
      setIsCollapsed(false);

      panelRef.current?.isCollapsed && panelRef.current.expand();
    },
    [tab],
  );

  const onPlayHandler = async () => {
    try {
      const request = await getAPI(
        url,
        query,
        variables && JSON.parse(variables),
        headers && JSON.parse(headers),
      );

      setResponse(convertToPrettier(JSON.stringify(request)));
    } catch (error) {
      setResponse('');
      toast.error(t('error-API-request'), {
        closeButton: false,
        onClick: () => {
          toast.dismiss();
        },
      });
    }
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
    <>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
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
          <div className={styles.editorsContainer}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={100}>
                <div className="h-full relative">
                  <QueryEditor setQuery={setQuery} response={query} />
                  <div className={styles.buttonsContainer}>
                    <button onClick={onPlayHandler} className={styles.sideButtons}>
                      <Play className="fill-white" />
                    </button>
                    <button onClick={openModal} className={styles.sideButtons}>
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
                <span onClick={onChevronHandler}>
                  {isCollapsed ? <ChevronUp /> : <ChevronDown />}
                </span>
              </PanelResizeHandle>
              <Panel
                minSize={20}
                collapsible
                ref={panelRef}
                onExpand={() => setIsCollapsed(false)}
                onCollapse={() => {
                  setIsCollapsed(true);
                }}
              >
                {tab === 'variables' ? (
                  <VariableEditor setVariables={setVariables} value={variables} />
                ) : (
                  <HeadersEditor setHeaders={setHeaders} value={headers} />
                )}
              </Panel>
            </PanelGroup>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <QueryEditor response={response} readonly />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} url={url} />
    </>
  );
};

export default Editor;
