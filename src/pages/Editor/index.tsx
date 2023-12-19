import { ResultPanel, QueryEditor, HeadersEditor, VariableEditor } from '../../shared/ui';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import styles from './Editor.module.scss';
import cn from 'classnames';
import { Play } from '../../app/assets/icons/Play';
import { Document } from '../../app/assets/icons/Document';
import { useEffect, useState } from 'react';
import { getSchema } from '../../shared/utils/getSchema';

const Editor = () => {
  const [tab, setTab] = useState<'variables' | 'headers'>('variables');

  useEffect(() => {
    getSchema('https://api.disneyapi.dev/graphql');
  }, []);

  const onHeaderClickHandler = () => {
    setTab('headers');
  };

  const onVariablesClickHandler = () => {
    setTab('variables');
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightColumn}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={80}>
            <div className="h-full relative">
              <QueryEditor />
              <div className={styles.buttonsContainer}>
                <button className="h-10 w-10 rounded-xl bg-fuchsia-500 p-2">
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
            {tab === 'variables' ? <VariableEditor /> : <HeadersEditor />}
          </Panel>
        </PanelGroup>
      </div>
      <div className={styles.leftColumn}>
        <ResultPanel />
      </div>
    </div>
  );
};

export default Editor;
