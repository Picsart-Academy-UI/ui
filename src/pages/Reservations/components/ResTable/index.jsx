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
import useStylesMain from '../../../../hooks/useStylesMain';
import ResTableRow from '../ResTableRow';

const ResTable = ({ data, deleteRes }) => {
  const classesMain = useStylesMain();
  return (
    <Paper>
      <TableContainer className={classesMain.tableContainer}>
        <Table>
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
          <TableBody>
            {data.map((item) => (
              <ResTableRow key={item._id} {...item} deleteRes={deleteRes} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(ResTable);
