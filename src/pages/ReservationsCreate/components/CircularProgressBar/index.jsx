import { memo } from 'react';
import { CircularProgress, Typography, Box } from '@material-ui/core';
import useStyles from './style';

const CircularProgressBar = ({ value, limit }) => {
  const percantage = Math.round((value / limit) * 100);
  const styles = useStyles();

  return (
    <Box className={styles.percantageWrapper}>
      <CircularProgress
        variant="determinate"
        value={percantage}
        size="5rem"
        thickness={5}
      />
      <Box className={styles.percantageNum}>
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${percantage}%`}</Typography>
      </Box>
    </Box>
  );
};

export default memo(CircularProgressBar);
