import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  reservedChair: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#b71c1c',
    color: '#ffffff',
    borderBottom: 'none',
    cursor: 'not-allowed',
  },
  freeChair: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#2e7d32',
    color: '#ffffff',
    borderBottom: 'none',
    cursor: 'pointer',
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
