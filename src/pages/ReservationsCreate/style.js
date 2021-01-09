import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
  canvasCont: {
    marginTop: '2rem',
  },
  selectedDate: {
    border: '0.125rem solid #000000',
  },
  tableCont: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  submitBtn: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
});

export default useStyles;
