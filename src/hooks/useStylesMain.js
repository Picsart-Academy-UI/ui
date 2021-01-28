import { makeStyles } from '@material-ui/core/styles';
import { CHAIR, STYLES } from '../constants';

const useStylesMain = makeStyles((theme) => ({
  paperContainer: {
    backgroundImage: `url(${CHAIR})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    width: '100vw',
    height: '100vh',
  },
  paperPadding: {
    minWidth: STYLES.appMinWidth,
    margin: 'auto',
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(7.5),
    },
  },
  commonButton: {
    backgroundColor: '#0077ff',
    '&:hover': {
      backgroundColor: '#298dff',
    },
    '&:active': {
      backgroundColor: '#0064d6',
    },
  },
  picsartButton: {
    padding: theme.spacing(1, 2),
    background:
      '-webkit-linear-gradient(120deg, rgba(219,68,218,1) 0%, rgba(89,192,246,1) 78%, rgba(58,231,255,1) 100%)',
    marginTop: theme.spacing(1),
    fontWeight: 500,
    color: 'white',
  },
  cellActionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconColorBlue: {
    color: 'rgb(35, 97, 211)',
  },
  iconColorRed: {
    color: 'rgb(253, 19, 85)',
  },
  tableContainer: {
    maxHeight: STYLES.tableMaxHeight,
    minWidth: STYLES.tableMinWidth,
  },
}));

export default useStylesMain;
