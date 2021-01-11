import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  freeChair: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#2e7d32',
    color: '#ffffff',
    borderBottom: 'none',
  },
  reservedChair: {
    minWidth: '6rem',
    maxWidth: '6rem',
    textAlign: 'center',
    backgroundColor: '#b71c1c',
    color: '#ffffff',
    borderBottom: 'none',
  },
  tableRow: {
    cursor: 'pointer',
    position: 'relative',
  },
  selected: {
    borderBottom: '0.125rem solid #000000',
    borderTop: '0.125rem solid #000000',
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
