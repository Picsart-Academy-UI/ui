import { TableBody, TableCell, TableRow, Box } from '@material-ui/core';
import clsx from 'clsx';
import useStylesMain from '../../../../hooks/useStylesMain';
import useStylesLocal from './style';

const Loading = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  return (
    <TableBody className={classesMain.tableBody}>
      <TableRow className={classesMain.tableRow}>
        <TableCell
          align="center"
          colSpan={6}
          className={clsx(classesMain.searchRes, classesMain.tableCell)}
        >
          <Box className={classesLocal.noText}> No Active Reservations </Box>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default Loading;
