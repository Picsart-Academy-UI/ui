import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  header: {
    backgroundColor: 'rgb(35, 97, 211)',
  },
  toolbar: {
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(4.5),
  },
  linkTab: {
    paddingTop: '18px',
    paddingBottom: '18px',
  },
  mobileMenuIcon: {
    marginLeft: 0,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  desktopMenuLeft: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  desktopMenuRight: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default useStylesLocal;
