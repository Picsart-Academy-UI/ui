import { TableRow, TableCell } from '@material-ui/core';
import useStylesMain from '../../../../hooks/useStylesMain';
import DeleteRow from '../DeleteRow';
// import EditRow from '../EditRow';

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
          {/* <EditRow id={id} name={name} /> */}
          <DeleteRow id={id} name={name} chairCount={chairCount} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeamTableRow;
