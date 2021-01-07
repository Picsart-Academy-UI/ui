import { Grid, Typography } from '@material-ui/core';
import useStylesLocal from './style';

const NotFound = () => {
  const classesLocal = useStylesLocal();

  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      justify="center"
      className={classesLocal.grid}
    >
      <Typography component="h5" variant="h5" className={classesLocal.h404}>
        404
      </Typography>
      <Typography component="h5" variant="h5" className={classesLocal.ht}>
        This page could not be found.
      </Typography>
    </Grid>
  );
};

export default NotFound;
