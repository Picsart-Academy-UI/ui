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
  smallText: {
    fontSize: '0.75rem',
    fontWeight: '700',
  },
});

export default useStyles;
