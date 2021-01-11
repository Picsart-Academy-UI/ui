import { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '../Alert';

const PositionedSnackbar = ({
  message,
  isSubmitted,
  setIsSubmitted,
  setMessage,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      setOpen(true);
    }
    return () => setMessage({ msg: '', severity: 'info' });
  }, [isSubmitted, setIsSubmitted, setMessage]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={3000}
      open={open}
      onClose={handleClose}
      // message={message}
      key={'bottomleft'}
      onExited={() => setIsSubmitted(false)}
    >
      <Alert onClose={handleClose} severity={message.severity}>
        {message.msg}
      </Alert>
    </Snackbar>
  );
};

export default PositionedSnackbar;
