import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useSelector } from 'react-redux';
import BookaSeat from '../BookaSeat';
import GoToProfile from '../GoToProfile';
import Delete from '../Delete';
import useStylesLocal from './style';

const UserRow = ({ user, name }) => {
  const [open, setOpen] = useState(false);
  const [teamObj, setTeamObj] = useState({});
  const classes = useStylesLocal();

  // console.log('user', user);

  const teams = useSelector((state) => state.teams.teams);
  // console.log("teams", teams);

  useEffect(() => {
    if (teams.length) {
      setTeamObj(teams.find((team) => team._id === user.team_id));
    }
  }, [teams, user]);

  // console.log("teamObj", teamObj);

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
          {user.first_name}
        </TableCell>
        <TableCell align="center">{user.last_name}</TableCell>
        <TableCell align="center">{teamObj.team_name}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="right">
          <GoToProfile user={user} />
          <BookaSeat />
          <Delete
            id={user._id}
            userFullName={`${user.first_name} ${user.last_name}`}
          />
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
                      user.birthday
                    </TableCell>
                    <TableCell align="center">{user.position}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
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
