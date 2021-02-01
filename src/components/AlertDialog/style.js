import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    borderTop: '4px solid #f50057',
    borderRadius: '4px',
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  deleteIconWrapper: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    left: '50%',
    borderRadius: '50%',
    backgroundColor: '#f50057',
    padding: theme.spacing(0.5),
  },
  deleteIcon: {
    color: 'white',
    fontSize: theme.spacing(4),
  },
  title: {
    paddingTop: theme.spacing(4),
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
}));

export default useStylesLocal;

export const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        overflowY: 'visible !important',
      },
    },
  },
});
