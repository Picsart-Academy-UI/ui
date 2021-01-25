import { Button, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <Grid component="div" container justify="flex-start">
      <Button onClick={handleBackClick} color="primary" variant="contained">
        <ArrowBackIcon></ArrowBackIcon>
      </Button>
    </Grid>
  );
};

export default BackButton;
