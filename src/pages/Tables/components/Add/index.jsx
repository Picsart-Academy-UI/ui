import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../../../hooks/useStylesMain';

const Add = () => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleClick = () => {
    history.push('tables/create');
  };

  return (
    <Grid component="div" container justify="flex-end">
      <Button
        onClick={handleClick}
        color="primary"
        variant="contained"
        className={classesMain.commonButton}
      >
        Add a Table
      </Button>
    </Grid>
  );
};

export default Add;
