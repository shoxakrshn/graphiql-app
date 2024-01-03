import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import close from '../../../app/assets/icons/close.svg';
import { getSchema, SchemaType, FieldType } from '../../utils/getSchema';
import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, url }) => {
  const { t } = useLanguage();
  const [schemaTypes, setSchemaTypes] = useState<SchemaType[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTypeDescription, setSelectedTypeDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isOpen) {
          const schema = await getSchema(url);
          setSchemaTypes(schema);
        }
      } catch (error) {
        toast.error(t('error-fetching'), {
          closeButton: false,
          onClick: () => {
            toast.dismiss();
          },
        });
      }
    };

    fetchData();
  }, [isOpen, url]);

  const renderFields = (fields: FieldType[]) => {
    return (
      <>
        <ul>
          {fields.map((field) => (
            <li key={field.name}>
              <strong>{field.name}:</strong> {field.type.name}
              <p>{field.description}</p>
              {field.fields && renderFields(field.fields)}
            </li>
          ))}
        </ul>
      </>
    );
  };

  const handleTypeClick = (typeName: string, typeDescription: string) => {
    if (typeName === selectedType) {
      setSelectedType(null);
      setSelectedTypeDescription(null);
    } else {
      setSelectedType(typeName);
      setSelectedTypeDescription(typeDescription);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalHeader}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
      </div>
      <div className={styles.modalContent}>
        <ul>
          {schemaTypes.map((type) => (
            <li key={type.name}>
              <strong>
                <a
                  href={`#${type.name}`}
                  onClick={() => handleTypeClick(type.name, type.description)}
                >
                  {type.name}
                </a>
              </strong>
              {selectedType === type.name && (
                <div>
                  {selectedTypeDescription && <p>{selectedTypeDescription}</p>}
                  {type.fields && renderFields(type.fields)}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
