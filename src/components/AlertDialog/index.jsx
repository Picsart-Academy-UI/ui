import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
} from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ButtonLoading from '../ButtonLoading';
import useStylesLocal, { theme } from './style';

const AlertDialog = ({
  open,
  handleClose,
  handleDeleteClick,
  titleText,
  deleteText = 'Delete',
}) => {
  const classesLocal = useStylesLocal();

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className={classesLocal.wrapper}>
          <Box className={classesLocal.deleteIconWrapper}>
            <DeleteOutlineIcon className={classesLocal.deleteIcon} />
          </Box>
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
              {deleteText}
            </ButtonLoading>
          </DialogActions>
        </Box>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default AlertDialog;
