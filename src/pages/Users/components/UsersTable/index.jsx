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
} from '@material-ui/core';
import React, { useCallback } from 'react';
import clsx from 'clsx';
import Pagination from '../../../../components/Pagination';
import useStylesMain from '../../../../hooks/useStylesMain';
import UserRow from '../UserRow';

const UsersTable = ({
  isLoading,
  rows,
  count,
  page,
  rowsPerPage,
  isAdmin,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const classesMain = useStylesMain();
  const { data } = rows;
  // console.log('data', data);

  const handleChangePage = (newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    onChangeRowsPerPage(value);
  };

  const onDelete = useCallback(() => onChangePage(page), [page]);

  return data || !isLoading ? (
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
                  <Box mr={9}>Actions</Box>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {data && !data.length ? (
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
              {rowsPerPage > 0 &&
                data.map((user) => (
                  <UserRow
                    key={user._id}
                    user={user}
                    isAdmin={isAdmin}
                    onDelete={onDelete}
                  />
                ))}
            </TableBody>
          )}
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
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default UsersTable;
