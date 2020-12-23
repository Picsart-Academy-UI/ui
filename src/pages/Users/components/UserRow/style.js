import { makeStyles } from '@material-ui/core/styles';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export default useRowStyles;
