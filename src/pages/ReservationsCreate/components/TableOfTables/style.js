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
  tableRow: {
    position: 'relative',
  },
  selected: {
    backgroundColor: '#fca311',
    cursor: 'pointer',
  },
  dateRow: {
    paddingLeft: '7rem',
    position: 'relative',
  },
  tableCell: {
    minWidth: '7rem',
    maxWidth: '7rem',
    textAlign: 'center',
    backgroundColor: '#3a4852',
    color: '#ffffff',
    borderRight: '0.125rem solid #ffffff',
    position: 'sticky',
    left: 0,
    zIndex: 1,
    cursor: 'pointer',
  },
  stickyHeaderCell: {
    top: 0,
    position: 'sticky',
    minWidth: '7rem',
    maxWidth: '7rem',
    textAlign: 'center',
    backgroundColor: '#3a4852',
    color: '#ffffff',
    borderRight: '0.125rem solid #ffffff',
    left: 0,
    zIndex: 3,
  },
  filler: {
    maxWidth: '7rem',
    minWidth: '7rem',
  },
  headerCell: {
    backgroundColor: '#3a4852',
    color: '#ffffff',
    textAlign: 'center',
  },
  container: {
    maxHeight: '40rem',
    maxWidth: '100%',
  },
});

export default useStyles;
