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
