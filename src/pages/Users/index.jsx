import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';
import { getTeamsAllRequestData } from '../../services/teams';
import {
  getLimitedUsersRequestData,
  getFilteredUsersRequestData,
} from '../../services/users';
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
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const { token, isAdmin, teams, usersData } = useSelector((state) => ({
    token: state.signin.token,
    isAdmin: state.signin.curUser.is_admin,
    teams: state.teams.teams,
    usersData: state.users.usersList,
  }));

  const users = useMemo(
    () => ({
      data: (usersData.data || []).filter(({ first_name }) =>
        first_name.toLowerCase().startsWith(searchValue.toLowerCase())
      ),
    }),
    [usersData.data, searchValue]
  );

  const teamsOptions = useMemo(
    () => [{ team_name: 'All', _id: 'all' }, ...teams],
    [teams]
  );

  const usersCount = isAdmin ? usersData.count || 0 : users.data.length;
  const makeRequest = useFetch();

  const dispatch = useDispatch();
  const fetchings = async (
    currentPage,
    currentRowsPerPage,
    currentSelectedTeamId,
    currentSearchValue
  ) => {
    if (!currentSearchValue && currentSelectedTeamId === '' && !fetched) {
      setIsLoading(true);
      const requestData = getLimitedUsersRequestData(
        token,
        currentRowsPerPage,
        currentPage,
        isAdmin
      );
      const fetchedUsers = await makeRequest(requestData);
      await dispatch(fetchedUsersList(fetchedUsers));

      if (!isAdmin) {
        setFetched(true);
      }

      setIsLoading(false);
    } else if (
      (isAdmin && currentSearchValue) ||
      currentSelectedTeamId !== ''
    ) {
      const requestData = getFilteredUsersRequestData(
        token,
        currentRowsPerPage,
        currentPage,
        currentSelectedTeamId,
        currentSearchValue
      );
      const selectedUsers = await makeRequest(requestData);
      await dispatch(fetchedUsersList(selectedUsers));

      setIsLoading(false);
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
      setIsLoading(true);
      debouncedFetchings(page + 1, rowsPerPage, selectedTeamId, value);
    }
    setSearchValue(value);
  };

  const handleSelectedTeamChange = async (teamId) => {
    await fetchings(page + 1, rowsPerPage, teamId, searchValue);
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

  useEffect(async () => {
    if (!teams.length) {
      const res = await makeRequest(getTeamsAllRequestData(token));
      dispatch(setTeams(res));
    }
  }, [dispatch, makeRequest, token]);

  useEffect(() => {
    fetchings(page + 1, rowsPerPage, selectedTeamId, searchValue);
  }, []);

  useEffect(() => {
    if (page !== 0) {
      handleChangePage(0);
    }
  }, [searchValue]);

  return (
    <>
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
        isLoading={isLoading}
        rows={users}
        count={usersCount}
        page={page}
        rowsPerPage={rowsPerPage}
        isAdmin={isAdmin}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Users;
