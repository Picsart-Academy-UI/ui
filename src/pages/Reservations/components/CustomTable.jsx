import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Box,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useStylesMain from '../../../hooks/useStylesMain';
import useStylesLocal from '../style';

const ResTable = ({ isHistory, data, edit, cancel }) => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
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
              {isHistory ? null : (
                <TableCell align="right">
                  <Box mr={3}>Actions</Box>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell align="center">{item.place}</TableCell>
                <TableCell align="center" className={classesLocal[item.status]}>
                  {item.status}
                </TableCell>
                {isHistory ? null : (
                  <TableCell align="right">
                    <IconButton onClick={edit} color="primary">
                      <EditOutlinedIcon className={classesMain.iconColorBlue} />
                    </IconButton>
                    <IconButton onClick={cancel} color="secondary">
                      <DeleteOutlineIcon className={classesMain.iconColorRed} />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ResTable;
