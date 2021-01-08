import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export default useStylesLocal;
