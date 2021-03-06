import React, { useState, memo } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import useMountedRef from '../../hooks/useMountedRef';
import useStyles from './style';

function ButtonLoading({
  children,
  color = 'primary',
  className,
  onClick,
  reservationId,
  autoFocus,
  size,
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const isMountedRef = useMountedRef();

  const handleButtonClick = () => {
    setLoading(true);
    onClick(reservationId).finally(() => {
      if (isMountedRef.current) {
        setLoading(false);
      }
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color={color}
          size={size}
          disabled={loading}
          onClick={handleButtonClick}
          className={className}
          autoFocus={autoFocus}
        >
          {children}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            className={classes.buttonProgress}
            color={color}
          />
        )}
      </div>
    </div>
  );
}

export default memo(ButtonLoading);
