import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
      test="grid-wrapper"
    >
      <Typography
        component="h5"
        variant="h5"
        className={classesLocal.h404}
        test="fof-msg"
      >
        404
      </Typography>
      <Typography
        component="h5"
        variant="h5"
        className={classesLocal.ht}
        test="expl-msg"
      >
        This page could not be found.
      </Typography>
    </Grid>
  );
};

export default NotFound;
