import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import TablePageWrapper from '../../components/TablePageWrapper';
import makeFetch from '../../services';
import { getTablesAllRequestData } from '../../services/tablesService';
import { setTables } from '../../store/slices/tablesSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import { getTeamsAllRequestData } from '../../services/teamsService';
import TableListRow from './components/TableListRow';
import Add from './components/Add';
import useStylesLocal from './style';

const TablesList = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, tables, teams } = useSelector((state) => ({
    token: state.signin.token,
    tables: state.tables.tables,
    teams: state.teams.teams,
  }));

  const [isFetching, setIsFetching] = useState(false);

  const teamsLeng = teams.length;
  const tablesLeng = tables.length;

  const fetchTables = useCallback(async () => {
    const tablesRes = await makeFetch(getTablesAllRequestData(token));
    if (tablesRes.data) {
      if (!teamsLeng) {
        const teamsRes = await makeFetch(getTeamsAllRequestData(token));
        if (teamsRes.data) {
          dispatch(setTeams(teamsRes));
          dispatch(setTables(tablesRes));
        }
      } else {
        dispatch(setTables(tablesRes));
      }
      setIsFetching(false);
    }
  }, [dispatch, token, teamsLeng]);

  useEffect(() => {
    if (!isFetching) {
      setIsFetching(true);
      if (!tablesLeng) {
        fetchTables();
      }
    }
  }, [tablesLeng, fetchTables, isFetching]);

  return (
    <TablePageWrapper>
      <div className={classesLocal.wrapper}>
        <Add />
      </div>
      <Paper>
        <TableContainer className={classesMain.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell align="center">Table Number</TableCell>
                <TableCell align="center">Chairs Count</TableCell>
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
                {id
                  ? tables
                      .filter((table) => table.team_id === id)
                      .map((table) => (
                        <TableListRow
                          teamId={table.team_id}
                          number={table.table_number}
                          chairCount={table.chairs_count}
                          key={table._id}
                          id={table._id}
                        />
                      ))
                  : tables.map((table) => (
                      <TableListRow
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
    </TablePageWrapper>
  );
};

export default TablesList;
