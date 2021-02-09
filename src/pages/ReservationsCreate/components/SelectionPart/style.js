import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableCont: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
  userNameBox: {
    margin: '1.5rem 0',
    fontSize: '1.5rem',
  },
});

export default useStyles;
