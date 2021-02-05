import { useCallback } from 'react';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../hooks/useStylesMain';
import useStylesLocal from './style';

const BackButton = ({ handleEvent }) => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const history = useHistory();

  const handleBackClick = useCallback(() => {
    if (handleEvent) {
      handleEvent();
    } else {
      history.goBack();
    }
  }, [handleEvent, history]);

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
