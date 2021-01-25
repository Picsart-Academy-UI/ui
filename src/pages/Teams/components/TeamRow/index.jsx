import { TableRow, TableCell } from '@material-ui/core';
import DeleteRow from '../DeleteRow';
import EditRow from '../EditRow';

const TeamRow = ({ name, membersCount, tablesCount, id }) => (
  <TableRow key={name}>
    <TableCell component="th" scope="row">
      {name}
    </TableCell>
    <TableCell align="center">{membersCount}</TableCell>
    <TableCell align="center">{tablesCount}</TableCell>
    <TableCell align="right">
      <EditRow id={id} name={name} />
      <DeleteRow id={id} name={name} />
    </TableCell>
  </TableRow>
);

export default TeamRow;
