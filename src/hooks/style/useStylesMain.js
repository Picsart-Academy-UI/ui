import { makeStyles } from '@material-ui/core/styles';

import { CHAIR_PATH } from '../../constants';

const useStylesMain = makeStyles(() => ({
  paperBackgroundImage: {
    backgroundImage: `url(${CHAIR_PATH})`,
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

export default useStylesMain;
