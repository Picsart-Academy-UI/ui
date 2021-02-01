import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modalCont: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: '#ffffff',
    width: '60%',
    minWidth: '16rem',
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
