import { useState, useEffect, memo } from 'react';
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
import useStylesMain from '../../../../hooks/useStylesMain';
import { transformFromISOToFormat } from '../../../../utils/dateHelper';
import BookaSeat from '../BookaSeat';
import GoToProfile from '../GoToProfile';
import DeleteUser from '../DeleteUser';
import GoToReservations from '../GoToReservations';
import useStylesLocal from './style';

const UserRow = ({ user, name, isAdmin, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const classesLocal = useStylesLocal();
  const classesMain = useStylesMain();

  const teams = useSelector((state) => state.teams.teams);

  useEffect(() => {
    if (teams.length) {
      const { team_name = '-' } =
        teams.find((team) => team._id === user.team_id) || {};
      setTeamName(team_name);
    }
  }, [teams, user]);

  return (
    <>
      <TableRow className={classesLocal.root}>
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
        <TableCell align="center">{teamName}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        {isAdmin && (
          <TableCell align="right">
            <div className={classesMain.cellActionsWrapper}>
              <GoToProfile user={user} />
              <GoToReservations user={user} />
              <BookaSeat user={user} />
              <DeleteUser
                id={user._id}
                userFullName={`${user.first_name} ${user.last_name}`}
                onDelete={onDelete}
              />
            </div>
          </TableCell>
        )}
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
                    <TableCell align="center">Birthday</TableCell>
                    <TableCell align="center">Position</TableCell>
                    <TableCell align="center">PhoneNumber</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={classesLocal.root} key={name}>
                    <TableCell align="center" component="th" scope="row">
                      {(user.birthday &&
                        transformFromISOToFormat(user.birthday)) ||
                        '-'}
                    </TableCell>
                    <TableCell align="center">{user.position}</TableCell>
                    <TableCell align="center">{user.phone || '-'}</TableCell>
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

export default memo(UserRow);
