import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  sbmtButton: {
    background:
      '-webkit-linear-gradient(100deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    marginTop: theme.spacing(3),
    fontWeight: 500,
  },
}));

export default useStylesLocal;
