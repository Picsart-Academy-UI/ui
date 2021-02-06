import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import Pagination from '../../../../components/Pagination';
import useStylesMain from '../../../../hooks/useStylesMain';
import UserRow from '../UserRow';

const UsersTable = ({
  isLoading,
  users,
  count,
  page,
  rowsPerPage,
  isAdmin,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const classesMain = useStylesMain();
  const { data } = users;

  const handleChangePage = (newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    onChangeRowsPerPage(value);
  };

  const onDelete = () => {
    onChangePage(page);
  };

  return (
    <Paper>
      <TableContainer className={classesMain.tableContainer}>
        <Table
          stickyHeader
          className={clsx({ [classesMain.tableEmpty]: data && !data.length })}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="center">Surname</TableCell>
              <TableCell align="center">Team</TableCell>
              <TableCell align="center">Gmail</TableCell>
              {isAdmin && (
                <TableCell align="right">
                  <Box mr={13}>Actions</Box>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {isLoading && (
            <TableBody className={classesMain.tableBody}>
              <TableRow className={classesMain.tableRow}>
                <TableCell
                  align="center"
                  colSpan={6}
                  className={clsx(classesMain.searchRes, classesMain.tableCell)}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {!isLoading && data && !data.length ? (
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
          ) : null}
          {!isLoading && data.length ? (
            <TableBody>
              {rowsPerPage > 0
                ? data.map((user) => (
                    <UserRow
                      key={user._id}
                      user={user}
                      isAdmin={isAdmin}
                      onDelete={onDelete}
                    />
                  ))
                : null}
            </TableBody>
          ) : null}
        </Table>
      </TableContainer>
      {isAdmin && (
        <Pagination
          rows={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default UsersTable;
