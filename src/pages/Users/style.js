import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  selectDropdown: {
    marginLeft: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 240,
      flexShrink: 0,
    },
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
