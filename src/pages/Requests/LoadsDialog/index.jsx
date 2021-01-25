import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Zoom,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loads from '../Loads';

const Transition = React.forwardRef((props, ref) => (
  <Zoom direction="bottom" ref={ref} {...props} />
));

const useStyles = makeStyles({
  dialogTitle: {
    padding: '8px 24px',
  },
  typography1: {
    lineHeight: 1,
    fontSize: 14,
  },
});

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleClickOpen('paper')}
      >
        See Load
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        TransitionComponent={Transition}
      >
        <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
          <div>Monetization</div>
          <Typography
            className={classes.typography1}
            variant="subtitle1"
            component="div"
            color="textSecondary"
          >
            User name
          </Typography>
          <Typography
            className={classes.typography1}
            variant="subtitle1"
            color="textSecondary"
            component="div"
          >
            17 Dec - 30 Dec
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            component="div"
          >
            <Loads />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
