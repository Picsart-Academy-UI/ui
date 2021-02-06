import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablePageWrapper from '../../components/TablePageWrapper';
import {
  fetchedUsersList,
  handleIsLoadingChange,
} from '../../store/slices/usersSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import makeFetch from '../../services';
import useDebounce from '../../hooks/useDebounce';
import useMount from '../../hooks/useMount';
import { getTeamsAllRequestData } from '../../services/teamsService';
import {
  getLimitedUsersRequestData,
  getFilteredUsersRequestData,
} from '../../services/usersService';
import Filter from '../../components/Filter';
import SelectDropdown from '../../components/SelectDropdown';
import UsersTable from './components/UsersTable';
import AddUser from './components/AddUser';
import useStylesLocal from './style';

const Users = () => {
  const classesLocal = useStylesLocal();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [fetched, setFetched] = useState(false);
  const { token, isAdmin, teams, usersData, isLoading } = useSelector(
    (state) => ({
      token: state.signin.token,
      isAdmin: state.signin.curUser.is_admin,
      teams: state.teams.teams,
      usersData: state.users.usersList,
      isLoading: state.users.isLoading,
    })
  );
  const dispatch = useDispatch();

  const users = useMemo(
    () => ({
      data: (usersData.data || []).filter(({ first_name }) =>
        first_name.toLowerCase().startsWith(searchValue.toLowerCase())
      ),
    }),
    [usersData.data, searchValue]
  );
  
  const teamsOptions = useMemo(
    () => (teams.length && [{ team_name: 'All', _id: 'all' }, ...teams]) || [],
    [teams]
  );

  const usersCount = isAdmin ? usersData.count || 0 : users.data.length;

  const fetchings = async (
    currentPage,
    currentRowsPerPage,
    currentSelectedTeamId,
    currentSearchValue
  ) => {
    if (!currentSearchValue && currentSelectedTeamId === '' && !fetched) {
      await dispatch(handleIsLoadingChange());
      const requestData = getLimitedUsersRequestData(
        token,
        currentRowsPerPage,
        currentPage,
        isAdmin
      );
      const fetchedUsers = await makeFetch(requestData);
      await dispatch(fetchedUsersList(fetchedUsers));

      if (!isAdmin) {
        setFetched(true);
      }
    } else if (
      (isAdmin && currentSearchValue) ||
      currentSelectedTeamId !== ''
    ) {
      await dispatch(handleIsLoadingChange());
      const requestData = getFilteredUsersRequestData(
        token,
        currentRowsPerPage,
        currentPage,
        currentSelectedTeamId,
        currentSearchValue
      );
      const selectedUsers = await makeFetch(requestData);
      await dispatch(fetchedUsersList(selectedUsers));
    }
  };

  const debouncedFetchings = useDebounce(fetchings, 100);

  const handleChangePage = async (newPage) => {
    await fetchings(newPage + 1, rowsPerPage, selectedTeamId, searchValue);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (value) => {
    await fetchings(1, value, selectedTeamId, searchValue);
    setRowsPerPage(value);
    setPage(0);
  };

  const handleInputChange = (value) => {
    if (isAdmin) {
      debouncedFetchings(1, rowsPerPage, selectedTeamId, value);
    }
    setPage(0);
    setSearchValue(value);
  };

  const handleSelectedTeamChange = async (teamId) => {
    await fetchings(1, rowsPerPage, teamId, searchValue);
    setPage(0);
    setSelectedTeamId(teamId);
  };

  const onSelectChange = (teamObj) => {
    if (teamObj.team_name === 'All') {
      handleSelectedTeamChange('');
      return;
    }
    const { _id } = teams.find((team) => team.team_name === teamObj.team_name);
    handleSelectedTeamChange(_id);
  };

  useEffect(() => {
    if (!users.data?.length && page !== 0 && usersCount / rowsPerPage <= page) {
      setPage(page - 1);
    }
  }, [users.data?.length, page, usersCount, rowsPerPage]);

  useEffect(() => {
    if (!teams.length) {
      const fetchTeams = async () => {
        const res = await makeFetch(getTeamsAllRequestData(token));
        dispatch(setTeams(res));
      };
      fetchTeams();
    }
  }, [dispatch, token, teams.length]);

  useMount(() => {
    fetchings(page + 1, rowsPerPage, selectedTeamId, searchValue);
  });

  return (
    <TablePageWrapper>
      <div className={classesLocal.wrapper}>
        <div className={classesLocal.searchWrapper}>
          <Filter
            value={searchValue}
            onChange={handleInputChange}
            className={classesLocal.filter}
            placeholder="Search By Name"
          />
          {isAdmin && (
            <SelectDropdown
              property="team_name"
              label="Team"
              options={teamsOptions}
              onChange={onSelectChange}
              className={classesLocal.selectDropdown}
            />
          )}
        </div>
        {isAdmin && <AddUser />}
      </div>
      <UsersTable
        isLoading={isAdmin ? isLoading : false}
        users={users}
        count={usersCount}
        page={page}
        rowsPerPage={rowsPerPage}
        isAdmin={isAdmin}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TablePageWrapper>
  );
};

export default Users;
