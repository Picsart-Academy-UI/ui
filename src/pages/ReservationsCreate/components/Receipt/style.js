import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  tableContainer: {
    maxHeight: '35rem',
    maxWidth: '100%',
  },
  isFreeBox: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  check: {
    marginLeft: '1rem',
    color: '#193F32',
  },
  cross: {
    marginLeft: '1rem',
    color: '#f50057',
  },
  checkBtn: {
    position: 'fixed',
    right: '0',
    bottom: '0',
    padding: '1rem 2rem',
  },
  submitBtn: {
    margin: '2rem',
    padding: '1rem 2rem',
  },
});

export default useStyles;
