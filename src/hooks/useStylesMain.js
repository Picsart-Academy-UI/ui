import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { GRADIENT } from '../constants';

const useStylesMain = makeStyles((theme) => ({
  tablePageWidth: {
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url(${GRADIENT})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    width: '100vw',
    height: '100vh',
    backgroundClip: 'text',
    '-webkitBackgroundClip': 'text',
    color: 'transparent',
    backgroundColor:
      '-webkit-linear-gradient(120deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
  },
  paperPadding: {
    minWidth: '564px',
    margin: 'auto',
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(7.5),
    },
  },
  commonButton: {
    backgroundColor: '#0077ff',
    '&:hover': {
      backgroundColor: '#298dff',
    },
    '&:active': {
      backgroundColor: '#0064d6',
    },
  },
  picsartButton: {
    padding: theme.spacing(1, 2),
    background:
      '-webkit-linear-gradient(120deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    marginTop: theme.spacing(4),
    fontWeight: 500,
    color: 'white',
  },
  cellActionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconColorBlue: {
    color: 'rgb(35, 97, 211)',
  },
  iconColorRed: {
    color: 'rgb(253, 19, 85)',
  },
  tableContainer: {
    // fullheight - header - margin - pagepadding - searchpadding - search - pagination
    height: 'calc(100vh - 60px - 60px - 64px - 16px - 61px - 52px)',
    minHeight: 410,
    minWidth: 500,
  },
  tableEmpty: {
    height: '100%',
  },
  tableBody: {
    height: '100%',
  },
  tableRow: {
    height: '100%',
  },
  tableCell: {
    height: '100%',
  },
  searchRes: {
    fontSize: theme.spacing(3),
  },
  snackbarLeftBottom: {
    left: theme.spacing(4),
    bottom: theme.spacing(4),
  },
  inputLong: {
    width: 360,
  },
  centeredColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

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
    MuiTextField: {
      root: {
        marginTop: '16px',
        marginBottom: '8px',
      },
    },
    MuiOutlinedInput: {
      adornedStart: {
        paddingLeft: '0',
      },
    },
  },
});

export default useStylesMain;
