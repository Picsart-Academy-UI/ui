import { useState, useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import useStylesMain from '../../hooks/useStylesMain';
import Alert from './components/Alert';

const PositionedSnackbar = ({
  message,
  isSubmitted,
  setIsSubmitted,
  setMessage,
}) => {
  const classesMain = useStylesMain();

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
      className={classesMain.snackbarLeftBottom}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={10000}
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
