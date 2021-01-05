import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';

import LinearProgressWithLabel from '../LinearProgressWithLabel';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 150,
    overflow: 'auto',
    border: '1px solid',
    borderColor: 'transparent',
    marginLeft: 'auto',

    '&:hover': {
      borderColor: '#D2D2D2',
      borderRadius: 4,
      zIndex: 10,
      position: 'relative',
      boxShadow: '1px 1px 3px 1px #D2D2D2',
    },
  },
  table: {
    minWidth: 255,
  },
});

const tableCellStyles = makeStyles({
  sizeSmall: {
    padding: '4px 8px',
  },
});

function createData(date, load, count) {
  return { date, load, count };
}

const rows = [
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
];

export default function Loads() {
  const classes = useStyles();
  const tableCell = tableCellStyles();

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" classes={tableCell}>
                  {row.date}
                </TableCell>
                <TableCell align="right" classes={tableCell}>
                  <LinearProgressWithLabel value={row.load} />
                </TableCell>
                <TableCell align="right" classes={tableCell}>
                  {row.count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
