import { TableRow, TableCell } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStylesMain from '../../../../hooks/useStylesMain';
import DeleteRow from '../DeleteRow';

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
          <DeleteRow id={id} name={number} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeamTableRow;
