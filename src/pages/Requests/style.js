import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxHeight: 150,
    overflow: 'auto',
    border: '1px solid',
    borderColor: 'transparent',

    '&:hover': {
      borderColor: '#D2D2D2',
      borderRadius: 4,
      zIndex: 10,
      position: 'relative',
      boxShadow: '1px 1px 3px 1px #D2D2D2',
    },
  },
  filter: {
    marginBottom: 40,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  '@media (min-width: 676px)': {
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    filter: {
      marginBottom: 0,
    },
  },
});

export default useStyles;
