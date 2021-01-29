import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  header: {
    // backgroundColor: '#3a76e8',
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
}));

export default useStylesLocal;
