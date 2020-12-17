import { makeStyles } from '@material-ui/core/styles';

const useStylesCustom = makeStyles((theme) => ({
  submitRight: {
    margin: theme.spacing(2, 0, 2, 2),
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
  },
  fullPage: {
    width: '100%',
    height: '100vh',
  },
  left50: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  column: {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    padding: '4rem',
    alignItems: 'center',
  },
  heading: {
    margin: theme.spacing(2, 0),
    color: 'rgba(0, 0, 0, 0.87)',
  },
  form: {
    width: '50%',
    minWidth: '300px',
  },
  centerLeft: {
    width: '50%',
    minWidth: '300px',
  },
}));

export default useStylesCustom;
