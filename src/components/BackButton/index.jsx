import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../hooks/useStylesMain';
import useStylesLocal from './style';

const BackButton = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const history = useHistory();

  const handleBackClick = () => history.goBack();

  return (
    <Button
      onClick={handleBackClick}
      color="primary"
      variant="contained"
      className={`${classesMain.commonButton} ${classesLocal.back}`}
    >
      <ArrowBackIcon></ArrowBackIcon>
    </Button>
  );
};

export default BackButton;
