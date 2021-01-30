import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ButtonLoading from '../ButtonLoading';
import useStylesLocal, { theme } from './style';

const AlertDialog = ({ open, handleClose, handleDeleteClick, titleText }) => {
  const classesLocal = useStylesLocal();

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classesLocal.wrapper}>
          <div className={classesLocal.deleteIconWrapper}>
            <DeleteOutlineIcon className={classesLocal.deleteIcon} />
          </div>
          <DialogTitle id="alert-dialog-title" className={classesLocal.title}>
            {titleText}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <ButtonLoading
              onClick={handleDeleteClick}
              color="secondary"
              autoFocus
            >
              Delete
            </ButtonLoading>
          </DialogActions>
        </div>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default AlertDialog;
