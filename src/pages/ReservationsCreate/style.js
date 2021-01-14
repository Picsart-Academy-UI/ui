import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    height: '85vh',
  },
  selectedDate: {
    border: '0.125rem solid #000000',
  },
  tableCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  submitBtn: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
});

export default useStyles;
