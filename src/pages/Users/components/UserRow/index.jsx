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
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import useStylesLocal from './style';

const UserRow = ({ row, name }) => {
  const [open, setOpen] = useState(false);
  const classes = useStylesLocal();

  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

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
          {row.name}
        </TableCell>
        <TableCell align="center">{row.surName}</TableCell>
        <TableCell align="center">{row.team}</TableCell>
        <TableCell align="center">{row.gmail}</TableCell>
        <TableCell align="right">
          <Button variant="contained" color="primary">
            Book a seat
          </Button>
          <Button title="Edit" onClick={handleEditClick} color="primary">
            <EditOutlinedIcon />
          </Button>
          <Button title="Delete" onClick={handleDeleteClick} color="secondary">
            <DeleteOutlineIcon />
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Birthdate</TableCell>
                    <TableCell>Position</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">
                      {row.additionalInfo.date}
                    </TableCell>
                    <TableCell>{row.additionalInfo.position}</TableCell>
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
