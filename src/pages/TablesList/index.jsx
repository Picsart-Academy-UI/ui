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
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getTablesAllRequestData } from '../../services/tables';
import { setTables } from '../../store/slices/tablesSlice';
import useStylesMain from '../../hooks/useStylesMain';
import BackButton from '../../components/BackButton';
import TeamTableRow from './components/TeamTableRow';
import AddTable from './components/AddTable';
import useStylesLocal from './style';

const TablesList = () => {
  const classesMain = useStylesMain();
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const dispatch = useDispatch();
  const { id } = useParams();
  const classesLocal = useStylesLocal();

  useEffect(() => {
    const getTables = async () => {
      const requestData = getTablesAllRequestData(token);
      const res = await makeRequest(requestData);
      if (res.data) {
        dispatch(setTables(res));
      }
    };

    getTables();
  }, [dispatch, makeRequest, token]);

  const tables = useSelector((state) =>
    state.tables.tables.filter((table) => table.team_id === id)
  );

  return (
    <>
      <div className={classesLocal.wrapper}>
        <BackButton />
        <AddTable />
      </div>
      <Paper>
        <TableContainer className={classesMain.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Table</TableCell>
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
                    This team has no chairs.
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {tables.map((table) => (
                  <TeamTableRow
                    name={table.table_name}
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
