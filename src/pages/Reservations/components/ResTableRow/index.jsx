import { useState, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { TableCell, TableRow, IconButton } from '@material-ui/core';
import AlertDialog from '../../../../components/AlertDialog';
import { transformFromISOToFormat } from '../../../../utils/dateHelper';
import useStyles from './style';

const ResTableRow = ({
  _id,
  start_date,
  end_date,
  status,
  user_id,
  table_id,
  chair_id,
  deleteRes,
}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = useCallback(() => setIsOpen((prev) => !prev), []);
  const deleteCallback = useCallback(() => {
    deleteRes(_id);
    handleChange();
  }, [handleChange]);
  const curUser = useSelector((state) => state.signin.curUser);

  return (
    <TableRow key={_id}>
      <TableCell>
        {transformFromISOToFormat(start_date)} -{' '}
        {transformFromISOToFormat(end_date)}
      </TableCell>
      <TableCell align="center">
        {table_id?.table_number}/{chair_id?.chair_number}
      </TableCell>
      <TableCell align="center" className={styles[status]}>
        {status}
      </TableCell>
      <TableCell>
        {user_id.first_name.slice(0, 1)}. {user_id.last_name}
      </TableCell>
      <TableCell align="right">
        <IconButton
          disabled={user_id._id !== curUser._id && !curUser.is_admin}
          onClick={handleChange}
          color="secondary"
        >
          <DeleteOutlineIcon className={styles.iconColorRed} />
        </IconButton>
        <AlertDialog
          open={isOpen}
          handleClose={handleChange}
          handleDeleteClick={deleteCallback}
          titleText="Do you really want to delete this reservation?"
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(ResTableRow);
