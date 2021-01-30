import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formWrapper: {
    // padding
  },
  checkbox: {
    margin: theme.spacing(2, 0),
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useStylesLocal;
