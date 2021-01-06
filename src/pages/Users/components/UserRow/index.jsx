import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import BookaSeat from '../BookaSeat';
import GoToProfile from '../GoToProfile';
import DeleteRow from '../DeleteRow';
import EditRow from '../EditRow';
import useStylesLocal from './style';

const UserRow = ({ row, name }) => {
  const [open, setOpen] = useState(false);
  const classes = useStylesLocal();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.first_name}
        </TableCell>
        <TableCell align="center">{row.last_name}</TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="right">
          <GoToProfile user={row} />
          <BookaSeat />
          <EditRow />
          <DeleteRow id={row._id} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} ml={4}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Birthdate</TableCell>
                    <TableCell align="center">Position</TableCell>
                    <TableCell align="center">PhoneNumber</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={name}>
                    <TableCell align="center" component="th" scope="row">
                      row.birthdate
                    </TableCell>
                    <TableCell align="center">{row.position}</TableCell>
                    <TableCell align="center">Phone</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;
