import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeFetch from '../../services';
import { getTablesAllRequestData } from '../../services/tablesService';
import { setTables } from '../../store/slices/tablesSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import { getTeamsAllRequestData } from '../../services/teamsService';
import TeamTableRow from './components/TeamTableRow';
import AddTable from './components/AddTable';
import useStylesLocal from './style';

const TablesList = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const dispatch = useDispatch();

  const { token, tables } = useSelector((state) => ({
    token: state.signin.token,
    tables: state.tables.tables,
  }));

  const fetchTables = async () => {
    const tablesRes = await makeFetch(getTablesAllRequestData(token));
    const teamsRes = await makeFetch(getTeamsAllRequestData(token));
    if (teamsRes.data && tablesRes.data) {
      dispatch(setTeams(teamsRes));
      dispatch(setTables(tablesRes));
    }
  };

  useEffect(() => {
    if (!tables.length) {
      fetchTables();
    }
  }, [tables.length]);

  return (
    <>
      <div className={classesLocal.wrapper}>
        <AddTable />
      </div>
      <Paper>
        <TableContainer className={classesMain.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell align="center">Table</TableCell>
                <TableCell align="center">Chair Count</TableCell>
                <TableCell align="right">
                  <Box mr={5}>Actions</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            {!tables.length ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={6}
                    className={classesMain.searchRes}
                  >
                    This team has no tables.
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {tables.map((table) => (
                  <TeamTableRow
                    teamId={table.team_id}
                    number={table.table_number}
                    chairCount={table.chairs_count}
                    key={table._id}
                    id={table._id}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TablesList;
