import { makeStyles } from '@material-ui/core/styles';

const useStylesLocal = makeStyles({
  table: {
    minWidth: 960,
  },
  button: {
    marginRight: 8,
  },
  range: {
    lineHeight: 1,
  },
  dateYear: {
    marginRight: 30,
  },
  loadingContainer: {
    padding: '48px 0',
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default useStylesLocal;
