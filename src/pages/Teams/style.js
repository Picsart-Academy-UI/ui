import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  filter: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 240,
      flexShrink: 0,
    },
  },
}));

export default useStylesLocal;
