import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  topCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '5rem',
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
  table: {
    margin: '2rem auto',
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
});

export default useStyles;
