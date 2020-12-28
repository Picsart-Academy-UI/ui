import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  avatar: {
    height: 200,
    width: 200,
  },
  emailField: {
    fontSize: '1rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  positionHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  positionField: {
    minWidth: 250,
  },
  sbmtButton: {
    background:
      '-webkit-linear-gradient(100deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    marginTop: theme.spacing(9),
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
