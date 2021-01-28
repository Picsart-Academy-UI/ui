import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
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
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  desktopMenuRight: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  mobileMenuRightIcon: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileMenuLeftIcon: {
    marginLeft: 0,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  linkTab: {
    paddingTop: '18px',
    paddingBottom: '18px',
  },
  desktopMenuLeft: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default useStylesLocal;
