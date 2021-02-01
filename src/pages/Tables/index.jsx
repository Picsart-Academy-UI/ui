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
import useFetch from '../../hooks/useFetch';
import { getTablesAllRequestData } from '../../services/tables';
import { setTables } from '../../store/slices/tablesSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import { getTeamsAllRequestData } from '../../services/teams';
import TeamTableRow from './components/TeamTableRow';
import AddTable from './components/AddTable';
import useStylesLocal from './style';

const TablesList = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const makeRequest = useFetch();
  const dispatch = useDispatch();

  const { token, tables } = useSelector((state) => ({
    token: state.signin.token,
    tables: state.tables.tables,
  }));

  useEffect(() => {
    const getTables = async () => {
      const requestTablesData = getTablesAllRequestData(token);
      const tablesRes = await makeRequest(requestTablesData);
      const requestTeamsData = getTeamsAllRequestData(token);
      const teamsRes = await makeRequest(requestTeamsData);
      if (teamsRes.data) {
        dispatch(setTeams(teamsRes));
      }
      if (tablesRes.data) {
        dispatch(setTables(tablesRes));
      }
    };

    const getTeams = async () => {};

    getTables();
    getTeams();
  }, [dispatch, makeRequest, token]);

  useEffect(() => {}, [dispatch, makeRequest, token]);

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
