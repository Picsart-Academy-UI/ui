import { TableRow, TableCell } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStylesMain from '../../../../hooks/useStylesMain';
import Edit from '../Edit';
import Delete from '../Delete';

const TeamTableRow = ({ teamId, number, chairCount, id }) => {
  const classesMain = useStylesMain();
  const teams = useSelector((state) => state.teams.teams);

  const teamName = (teams.find((t) => t._id === teamId) || {}).team_name;

  return (
    <TableRow key={number}>
      <TableCell component="th" scope="row">
        {teamName}
      </TableCell>
      <TableCell align="center">{number}</TableCell>
      <TableCell align="center">{chairCount}</TableCell>
      <TableCell align="right">
        <div className={classesMain.cellActionsWrapper}>
          <Edit id={id} name={number} />
          <Delete id={id} name={number} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeamTableRow;
