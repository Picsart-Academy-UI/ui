import React from 'react';
import { Snackbar, Fade } from '@material-ui/core'; // eslint-disable-line
import MuiAlert from '@material-ui/lab/Alert';

export default function CustomSnackbar({
  type,
  message,
  isOpen,
  handleClose: close,
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    close();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={type}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
