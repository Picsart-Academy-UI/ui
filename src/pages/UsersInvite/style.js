import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sbmtButton: {
    background:
      '-webkit-linear-gradient(100deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    marginTop: theme.spacing(1),
    fontWeight: 500,
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useStylesLocal;
