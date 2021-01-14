import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles({
  boxHeader: {
    alignItems: 'center',
    minHeight: '5rem',
    fontSize: '1.5rem',
  },
  edit: {
    color: '#3f51b5',
  },
  cancel: {
    color: '#f50057',
  },
  pending: {
    color: '#f9a825',
  },
  approved: {
    color: '#2e7d32',
  },
  rejected: {
    color: '#b71c1c',
  },
});

export default useStylesLocal;
