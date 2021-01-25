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
import TeamRow from '../TeamRow';
import useStylesLocal from './style';

const TeamsTable = (props) => {
  const classes = useStylesLocal();
  const { teams } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
  );
};

export default TeamsTable;
