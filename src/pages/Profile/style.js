import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  avatar: {
    height: 100,
    width: 100,
  },
  emailField: {
    fontSize: '1rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  textHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  textField: {
    minWidth: 250,
  },
  sbmtButton: {
    background:
      '-webkit-linear-gradient(100deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    marginTop: theme.spacing(1),
    fontWeight: 500,
  },
  chngAvtr: {
    padding: 0,
    backgroundColor: 'Transparent',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'Transparent',
      boxShadow: 'none',
    },
  },
}));

export default useStylesLocal;
