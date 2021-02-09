import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  reserved: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#b71c1c',
    color: '#ffffff',
    borderBottom: 'none',
    cursor: 'not-allowed',
  },
  free: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#2e7d32',
    color: '#ffffff',
    borderBottom: 'none',
    cursor: 'pointer',
  },
  yours: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#004B90',
    color: '#ffffff',
    borderBottom: 'none',
    cursor: 'not-allowed',
  },
  unavailable: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#282F28',
    color: '#ffffff',
    borderBottom: 'none',
    cursor: 'not-allowed',
  },
  weekend: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#686b73',
    color: '#ffffff',
    borderBottom: 'none',
    cursor: 'not-allowed',
  },
  selected: {
    backgroundColor: '#fca311',
    cursor: 'pointer',
  },
});

export default useStyles;
