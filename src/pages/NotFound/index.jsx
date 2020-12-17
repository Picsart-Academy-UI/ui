import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStylesLocal from './useStylesLocal';

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
