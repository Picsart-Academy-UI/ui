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
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  refreshButton: {
    marginTop: 32,
  },
  filter: {
    marginBottom: 40,
    width: '100%',
  },
  selectDropdown: {
    marginRight: 0,
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    width: '100%',
  },
  '@media (min-width: 676px)': {
    filterContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    filter: {
      marginBottom: 0,
      width: 240,
    },
    selectDropdown: {
      marginRight: 20,
      width: 240,
    },
    topBar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    refreshButton: {
      marginTop: 0,
    },
  },
});

export default useStyles;
