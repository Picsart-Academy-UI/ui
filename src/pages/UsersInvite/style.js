import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useStylesLocal;
