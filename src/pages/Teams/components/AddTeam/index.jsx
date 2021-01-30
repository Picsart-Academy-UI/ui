import { Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../../../hooks/useStylesMain';

const AddTeam = () => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleAddClick = () => {
    history.push('/teams/create');
  };

  return (
    <Grid component="div" container justify="flex-end">
      <Button
        onClick={handleAddClick}
        color="primary"
        variant="contained"
        className={classesMain.commonButton}
      >
        Add a Team
      </Button>
    </Grid>
  );
};

export default AddTeam;
