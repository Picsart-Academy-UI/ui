import React, { useState, memo, useEffect } from 'react';
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
import { seeLoad } from '../../../services/reservationsService';
import { tokenSelector } from '../../../store/selectors';
import Loads from '../Loads';
import useMemoSelector from '../../../hooks/useMemoSelector';

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

function LoadsDialog({ row }) {
  const { date, user } = row;
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);

  const classes = useStyles();
  const { token } = useMemoSelector((state) => tokenSelector(state));

  useEffect(() => {
    console.log(
      date.start,
      date.end,
      user.teamId,
      'stexic vercnel team_id, start, end'
    );
    seeLoad(token, date.start, date.end, user.teamId)
      .then((res) => new Promise((r) => setTimeout(() => r(res), 1500)))
      .then((res) => {
        setData(res.data);
      });
  }, [token]);

  const handleClose = () => {
    setData([]);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      TransitionComponent={Transition}
    >
      <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
        <div>{user.team}</div>
        <Typography
          className={classes.typography1}
          variant="subtitle1"
          component="div"
          color="textSecondary"
        >
          {user.name} ({user.position})
        </Typography>
        <Typography
          className={classes.typography1}
          variant="subtitle1"
          color="textSecondary"
          component="div"
        >
          {date.range} ({date.days} {date.days > 1 ? 'days' : 'day'})
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
          component="div"
        >
          <Loads data={data} teamCount={user.teamCount} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(LoadsDialog);
