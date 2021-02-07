import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  center: {
    height: 'calc(100vh - 112px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 124px)',
    },
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
