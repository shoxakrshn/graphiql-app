import { Link } from 'react-router-dom';
import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';
import { Button } from '../Button';
import { eButtonType } from '../../utils/data';

export const SignedUserHeader = () => {
  const { t } = useLanguage();

  return (
    <>
      <h3>user email</h3>
      <Link to="/logout">
        <Button text={t('log-out')} typeButton={eButtonType.Outlined} />
      </Link>
      <Link to="/editor">
        <Button text={t('graphiql')} typeButton={eButtonType.Outlined} />
      </Link>
    </>
  );
};
