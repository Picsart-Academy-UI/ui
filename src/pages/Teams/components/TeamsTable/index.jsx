import React from 'react';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@material-ui/core';
import useStylesMain from '../../../../hooks/useStylesMain';
import TeamRow from '../TeamRow';

const TeamsTable = ({ teams }) => {
  const classesMain = useStylesMain();
  return (
    <Paper>
      <TableContainer className={classesMain.tableContainer}>
        <Table
          stickyHeader
          className={clsx({ [classesMain.tableEmpty]: !teams.length })}
        >
          <TableHead>
            <TableRow>
              <TableCell>Teams</TableCell>
              <TableCell align="center">MembersCount</TableCell>
              <TableCell align="center">TablesCount</TableCell>
              <TableCell align="right">
                <Box mr={9}>Actions</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          {!teams.length ? (
            <TableBody className={classesMain.tableBody}>
              <TableRow className={classesMain.tableRow}>
                <TableCell
                  align="center"
                  colSpan={6}
                  className={clsx(classesMain.searchRes, classesMain.tableCell)}
                >
                  <Typography variant="h4" component="div">
                    Nothing Found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {teams.map((team) => (
                <TeamRow
                  name={team.team_name}
                  membersCount={team.members_count}
                  tablesCount={team.tables.length}
                  key={team._id}
                  id={team._id}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeamsTable;
