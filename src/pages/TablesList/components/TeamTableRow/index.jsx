import { TableRow, TableCell } from '@material-ui/core';
import useStylesMain from '../../../../hooks/useStylesMain';
import DeleteRow from '../DeleteRow';

const TeamTableRow = ({ name, chairCount, id }) => {
  const classesMain = useStylesMain();

  return (
    <TableRow key={name}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="center">{chairCount}</TableCell>
      <TableCell align="right">
        <div className={classesMain.cellActionsWrapper}>
          <DeleteRow id={id} name={name} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeamTableRow;
