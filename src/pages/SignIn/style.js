import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  header: {
    fontSize: '3rem',
    letterSpacing: 7,
    paddingTop: theme.spacing(5),
    textAlign: 'center',
  },
  signInContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
  },
  glogo: {
    width: 34,
    height: 34,
    marginRight: theme.spacing(1),
  },
  buttonPicsart: {
    background:
      '-webkit-linear-gradient(100deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    fontSize: '1rem',
  },
}));

export default useStylesLocal;
