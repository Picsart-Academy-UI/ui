import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  header: {
    fontSize: '3rem',
    letterSpacing: 7,
    paddingTop: theme.spacing(5),
    textAlign: 'center',
  },
  signInContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
  },
  google: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(2),
  },
  buttonGoogle: {
    padding: theme.spacing(1),
    backgroundColor: 'white',
    color: 'rgba(0,0,0,.54)',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    'text-transform': 'initial',
    'font-family': '"Roboto", arial, sans-serif',
    'box-shadow':
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    'transition-property': 'background-color, box-shadow',
    'transition-duration': '150ms',
    'transition-timing-function': 'ease-in-out',
    '&:focus': {
      backgroundColor: 'white',
      'box-shadow':
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    '&:hover': {
      backgroundColor: 'white',
      'box-shadow':
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    '&:active': {
      backgroundColor: 'white',
      'box-shadow':
        '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    },
  },
}));

export default useStylesLocal;
