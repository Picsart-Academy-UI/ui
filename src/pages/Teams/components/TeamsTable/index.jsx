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
import useStylesMain from '../../../../hooks/useStylesMain';
import TeamRow from '../TeamRow';

const TeamsTable = (props) => {
  const classesMain = useStylesMain();
  const { teams } = props;

  return (
    <Paper>
      <TableContainer className={classesMain.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Teams</TableCell>
              <TableCell align="center">MembersCount</TableCell>
              <TableCell align="center">TablesCount</TableCell>
              <TableCell align="right">
                <Box mr={5}>Actions</Box>
              </TableCell>
            </TableRow>
          </TableHead>
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
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeamsTable;
