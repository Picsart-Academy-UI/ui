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
  modalCont: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#ffffff',
    maxWidth: '80%',
    transform: 'translate(-50%,-50%)',
    border: 'none',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '2rem 0',
  },
  joke: {
    padding: '0 0 1rem',
    color: '#000000',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  num: {
    padding: '0 0 2rem',
    color: '#000000',
    fontSize: '1.5rem',
    fontWeight: '800',
    textAlign: 'center',
  },
  warning: {
    color: '#f50057',
    textAlign: 'center',
  },
});

export default useStyles;
