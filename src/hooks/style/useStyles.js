import { makeStyles } from '@material-ui/core/styles';

const chairPath = `${process.env.PUBLIC_URL}/images/chair.png`;

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    backgroundImage: `url(${chairPath})`,
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '3.8rem',
    },
    fontFamily: 'Alieron',
    letterSpacing: 7,
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  signInContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(6),
  },
  glogo: {
    width: '34px',
    height: '34px',
    marginRight: theme.spacing(1),
  },
  buttonPcsrt: {
    background:
      '-webkit-linear-gradient(100deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    fontSize: '0.1rem',
    '@media (min-width:600px)': {
      fontSize: '1.0rem',
    },
    font: 'initial',
  },
}));

export default useStyles;
