import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const TeamRow = ({ name, membersCount, tablesCount }) => {
  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  return (
    <TableRow key={name}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="center">{membersCount}</TableCell>
      <TableCell align="center">{tablesCount}</TableCell>
      <TableCell align="right">
        <Button title="Edit" onClick={handleEditClick} color="primary">
          <EditOutlinedIcon />
        </Button>
        <Button title="Delete" onClick={handleDeleteClick} color="secondary">
          <DeleteOutlineIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TeamRow;
