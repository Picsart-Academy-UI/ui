import { memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@material-ui/core';
import clsx from 'clsx';
import useStylesMain from '../../../../hooks/useStylesMain';
import Loading from '../../../../components/Loading';
import ResTableRow from '../ResTableRow';
import NoReservations from '../NoReservations';

const ResTable = ({ data, deleteRes, isLoading }) => {
  const classesMain = useStylesMain();
  return (
    <Paper>
      <TableContainer className={classesMain.tableContainer}>
        <Table
          stickyHeader
          className={clsx({
            [classesMain.tableEmpty]: isLoading || (data && !data.length),
          })}
        >
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                Date
              </TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">
                <Box>Actions</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          {isLoading && <Loading />}

          {!isLoading && data.length > 0 && (
            <TableBody>
              {data.map((item) => (
                <ResTableRow key={item._id} {...item} deleteRes={deleteRes} />
              ))}
            </TableBody>
          )}
          {!isLoading && data.length === 0 && <NoReservations />}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(ResTable);
