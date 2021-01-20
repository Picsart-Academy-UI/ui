import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    '& > div': {
      width: 'calc(100% / 2)',
    },
  },
}));

export default useStylesLocal;
