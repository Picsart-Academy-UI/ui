import { makeStyles } from '@material-ui/core/styles';
import { LONLEY_CHAIR } from '../../constants';

const useStylesMain = makeStyles((theme) => ({
  paperContainer: {
    backgroundImage: `url(${LONLEY_CHAIR})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
  },
  paperPadding: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
  },
}));

export default useStylesMain;
