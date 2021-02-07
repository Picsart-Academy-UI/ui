import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeams } from '../../store/slices/teamsSlice';
import TablePageWrapper from '../../components/TablePageWrapper';
import Filter from '../../components/Filter';
import TeamsTable from './components/TeamsTable';
import AddTeam from './components/AddTeam';
import useStylesLocal from './style';

const Teams = () => {
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const classesLocal = useStylesLocal();

  const filteredTeams = useMemo(
    () =>
      (teams || []).filter((item) =>
        item.team_name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue, teams]
  );

  useEffect(() => {
    dispatch(fetchTeams(token));
  }, [dispatch, token]);

  return (
    <TablePageWrapper>
      <div className={classesLocal.wrapper}>
        <Filter
          value={searchValue}
          onChange={setSearchValue}
          className={classesLocal.filter}
          placeholder="Search By Name"
        />
        <AddTeam />
      </div>
      <TeamsTable teams={filteredTeams} />
    </TablePageWrapper>
  );
};

export default Teams;
