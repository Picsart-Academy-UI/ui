import React, { useEffect, useState } from 'react';
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
  CircularProgress,
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

export default function Loads({ data, teamCount }) {
  const classes = useStyles();
  const tableCell = tableCellStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.length) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    const r = (data || [])
      .filter(
        (item) =>
          !(
            new Date(Object.keys(item)[0]).getDay() === 6 ||
            new Date(Object.keys(item)[0]).getDay() === 0
          )
      )
      .map((item) =>
        createData(
          new Date(Object.keys(item)[0]).toLocaleString('en-EN', {
            month: 'short',
            day: 'numeric',
          }),
          (Object.values(item)[0] / teamCount) * 100,
          Object.values(item)[0]
        )
      );
    setRows(r);
  }, [data]);

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
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={5}
                  className={classes.loadingContainer}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
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
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
