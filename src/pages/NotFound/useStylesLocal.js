import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  grid: {
    height: '100vh',
  },
  h404: {
    fontSize: theme.spacing(3),
    fontWeight: 600,
    padding: theme.spacing(1, 2.5, 1, 0),
    borderRight: '1px solid rgba(0, 0, 0, .5)',
    marginRight: theme.spacing(2.5),
  },
  ht: {
    margin: theme.spacing(1, 0),
    fontSize: '14px',
    color: 'rgba(0, 0, 0, .8)',
  },
}));

export default useStylesLocal;
