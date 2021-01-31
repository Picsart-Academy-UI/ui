import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  loader: {
    color: 'white',
  },
  checkbox: {
    margin: theme.spacing(2, 0),
  },
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputsWrapper2: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  columnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 2),
  },
}));

export default useStylesLocal;

export const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
        position: 'absolute',
        top: '100%',
      },
    },
    MuiFormControl: {
      root: {
        paddingTop: '16px',
      },
    },
    MuiInputLabel: {
      root: {
        paddingTop: '16px',
      },
    },
    MuiFormControlLabel: {
      root: {
        paddingTop: '16px',
      },
    },
  },
});
