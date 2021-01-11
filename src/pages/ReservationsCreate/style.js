import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  contWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    height: '85vh',
  },
  topCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '5rem',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'center',
    color: '#000000',
    marginRight: '2rem',
  },
  datePicker: {
    marginRight: '2rem',
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
