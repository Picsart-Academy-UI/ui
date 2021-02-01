import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableRow: {
    position: 'relative',
  },
  tableCell: {
    minWidth: '7rem',
    maxWidth: '7rem',
    textAlign: 'center',
    backgroundColor: '#3a4852',
    color: '#ffffff',
    borderRight: '0.125rem solid #ffffff',
    position: 'sticky',
    left: 0,
    zIndex: 1,
    cursor: 'pointer',
  },
});

export default useStyles;
