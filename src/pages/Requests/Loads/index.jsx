import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from '@material-ui/core';
import LinearProgressWithLabel from '../LinearProgressWithLabel';

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
  },
  table: {
    minWidth: 300,
  },
  tableCellCount: {
    color: '#4caf50',
    fontWeight: 'bold',
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
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
  createData('17 Dec', 70, 6),
  createData('18 Dec', 14, 9),
  createData('19 Dec', 59, 16),
  createData('20 Dec', 35, 7),
  createData('30 Dec', 20, 16),
  createData('17 Dec', 70, 6),
];

export default function Loads() {
  const classes = useStyles();
  const tableCell = tableCellStyles();

  return (
    <Box className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">By team</TableCell>
              <TableCell align="right">Approved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" classes={tableCell}>
                  {row.date}
                </TableCell>
                <TableCell align="right" classes={tableCell}>
                  <LinearProgressWithLabel value={row.load} />
                </TableCell>
                <TableCell
                  align="right"
                  classes={tableCell}
                  className={classes.tableCellCount}
                >
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
