import {
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import clsx from 'clsx';
import useStylesMain from '../../hooks/useStylesMain';

const Loading = () => {
  const classesMain = useStylesMain();
  return (
    <TableBody className={classesMain.tableBody}>
      <TableRow className={classesMain.tableRow}>
        <TableCell
          align="center"
          colSpan={6}
          className={clsx(classesMain.searchRes, classesMain.tableCell)}
        >
          <CircularProgress />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default Loading;
