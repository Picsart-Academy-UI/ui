import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Button } from '@material-ui/core';
import useMountedRef from '../../hooks/useMountedRef';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

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
