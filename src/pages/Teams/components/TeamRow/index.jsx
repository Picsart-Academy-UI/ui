import { TableRow, TableCell } from '@material-ui/core';
import useStylesMain from '../../../../hooks/useStylesMain';
import DeleteRow from '../Delete';
import EditRow from '../EditRow';
import SeeTeamTables from '../SeeTeamTables';

const TeamRow = ({ name, membersCount, tablesCount, id }) => {
  const classesMain = useStylesMain();

  return (
    <TableRow key={name}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="center">{membersCount}</TableCell>
      <TableCell align="center">{tablesCount}</TableCell>
      <TableCell align="right">
        <div className={classesMain.cellActionsWrapper}>
          <SeeTeamTables id={id} />
          <EditRow id={id} name={name} />
          <DeleteRow id={id} name={name} membersCount={membersCount} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeamRow;
