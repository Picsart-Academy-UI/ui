import { makeStyles } from '@material-ui/core/styles';
import { CHAIR } from '../../constants';

const useStylesMain = makeStyles((theme) => ({
  paperContainer: {
    backgroundImage: `url(${CHAIR})`,
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
