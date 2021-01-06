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
    padding: theme.spacing(10),
  },
}));

export default useStylesMain;
