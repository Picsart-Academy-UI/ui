import { memo } from 'react';
// import {useSelector} from 'react-redux';
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
import ResTableRow from '../ResTableRow';

const ResTable = ({ data, deleteRes }) => (
  // const isAdmin = useSelector((state) => state.signin.curUser.is_admin);
  <Paper>
    <TableContainer>
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

export default memo(ResTable);
