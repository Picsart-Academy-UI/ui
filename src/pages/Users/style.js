import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0),
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  selectDropdown: {
    marginLeft: 25,
    width: '100%',
  },
  filter: {
    width: '100%',
  },
}));

export default useStylesLocal;

// searchWrapper: {
//   display: 'flex',
//   alignItems: 'center',
// },
