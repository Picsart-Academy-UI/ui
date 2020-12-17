import { makeStyles } from '@material-ui/core/styles';

const useStylesCustom = makeStyles((theme) => ({
  MuiContainerRoot: {
    float: 'left',
    marginLeft: theme.spacing(5),
  },
  paper: {
    marginTop: theme.spacing(8),
    marginRight: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '4.5rem',
    },
    fontFamily: 'Alieron',
    letterSpacing: 7,
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'Transparent',
    outline: 'none',
    '&:hover': {
      backgroundColor: 'Transparent',
    },
  },
}));

export default useStylesCustom;
