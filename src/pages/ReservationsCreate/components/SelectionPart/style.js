import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableCont: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
});

export default useStyles;
