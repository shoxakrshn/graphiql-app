import React, { useEffect, useState, Suspense } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import close from '../../../app/assets/icons/close.svg';
import { getSchema, SchemaType, FieldType, TypeDetails } from '../../utils/getSchema';
import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';
import styles from './Modal.module.scss';

const SuspenseFallback = () => <div>Loading documentation...</div>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

interface ModalContentProps {
  schemaTypes: SchemaType[];
  selectedType: string | null;
  selectedTypeDescription: string | null;
  handleTypeClick: (typeName: string, typeDescription: string) => void;
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

  const renderArgs = ({ name, list, nonNull }: TypeDetails) => {
    return list ? `[${name}${nonNull ? '!' : ''}]` : `${name}${nonNull ? '!' : ''}`;
  };

  const ModalContent: React.FC<ModalContentProps> = ({
    schemaTypes,
    selectedType,
    selectedTypeDescription,
    handleTypeClick,
  }) => (
    <ul>
      {schemaTypes.map((type) => (
        <li key={type.name}>
          <strong>
            <a
              className={styles.typeName}
              href={`#${type.name}`}
              onClick={() => handleTypeClick(type.name, type.description)}
            >
              {type.name}
            </a>
          </strong>
          <div
            className={`${styles.fieldContainer} ${
              selectedType === type.name ? styles.visible : ''
            }`}
          >
            {selectedType === type.name && (
              <>
                {selectedTypeDescription && <p>{selectedTypeDescription}</p>}
                {type.fields && <div className={styles.fieldList}>{renderFields(type.fields)}</div>}
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  const renderFields = (fields: FieldType[]) => (
    <>
      <ul>
        {fields.map((field) => (
          <li key={field.name}>
            <strong>{field.name}</strong>
            {field.args && field.args.length > 0 && (
              <span>
                ({field.args.map((arg) => `${arg.name}: ${renderArgs(arg.type)}`).join(', ')})
              </span>
            )}
            :{' '}
            <a
              className={styles.typeName}
              href={`#${field.type.name}`}
              onClick={() => handleTypeListClick(field.type.name)}
            >
              {renderArgs(field.type)}
            </a>
            <p>{field.description}</p>
            {field.fields && renderFields(field.fields)}
          </li>
        ))}
      </ul>
    </>
  );

  const handleTypeListClick = (typeName: string) => {
    const matchedType = schemaTypes.find((schemaType) => schemaType.name === typeName);

    if (matchedType) {
      const { name, description } = matchedType;
      handleTypeClick(name, description);
    }
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
        <Suspense fallback={<SuspenseFallback />}>
          <ModalContent
            schemaTypes={schemaTypes}
            selectedType={selectedType}
            selectedTypeDescription={selectedTypeDescription}
            handleTypeClick={handleTypeClick}
          />
        </Suspense>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
