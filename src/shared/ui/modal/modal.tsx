import React, { useEffect, useRef } from 'react';
import close from '../../../app/assets/icons/close.svg';
import styles from './Modal.module.scss';
import { getSchema } from '../../utils/getSchema';
import { Docs, DocsOptions } from 'graphql-docs';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, url }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<Docs | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schema = await getSchema(url);

        if (isOpen && modalRef.current) {
          const docsContainer = modalRef.current as HTMLElement;
          docsContainer.innerHTML = '';

          const docsOptions: DocsOptions = { schema };
          docsRef.current = new Docs(docsOptions);

          // Ensure 'docsRef.current' exists before calling methods
          if (docsRef.current) {
            docsRef.current.render(docsContainer);
          }
        }
      } catch (error) {
        console.error('Error fetching or rendering GraphQL schema:', error);
      }
    };

    fetchData();
  }, [isOpen, url]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={close} alt="Close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
