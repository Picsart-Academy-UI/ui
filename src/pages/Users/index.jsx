import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import TablePageWrapper from '../../components/TablePageWrapper';
import {
  fetchedUsersList,
  handleIsLoadingChange,
  setSelectedTeamId,
  setPage,
  setRowsPerPage,
} from '../../store/slices/usersSlice';
import { fetchTeams } from '../../store/slices/teamsSlice';
import makeFetch from '../../services';
import useDebounce from '../../hooks/useDebounce';
import useMemoSelector from '../../hooks/useMemoSelector';
import useMount from '../../hooks/useMount';
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
  const [searchValue, setSearchValue] = useState('');
  const [fetched, setFetched] = useState(false);

  const {
    token,
    isAdmin,
    teams,
    usersData,
    isLoading,
    page,
    rowsPerPage,
    selectedTeamId,
  } = useMemoSelector((state) => ({
    token: state.signin.token,
    isAdmin: state.signin.curUser.is_admin,
    teams: state.teams.teams,
    usersData: state.users.usersList,
    isLoading: state.users.isLoading,
    page: state.users.page,
    rowsPerPage: state.users.rowsPerPage,
    selectedTeamId: state.users.selectedTeamId,
  }));

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
    () => (teams.length && [{ team_name: 'All', _id: '' }, ...teams]) || [],
    [teams]
  );

  const selectedTeamObj = useMemo(
    () =>
      teamsOptions.length &&
      teamsOptions.find((team) => team._id === selectedTeamId),
    [teamsOptions, selectedTeamId]
  );

  const usersCount = isAdmin ? usersData.count || 0 : users.data.length;

  const fetchings = async (
    currentPage,
    currentRowsPerPage,
    currentSelectedTeamId,
    currentSearchValue
  ) => {
    if (!currentSearchValue && currentSelectedTeamId === '' && !fetched) {
      dispatch(handleIsLoadingChange());
      const requestData = getLimitedUsersRequestData(
        token,
        currentRowsPerPage,
        currentPage,
        isAdmin
      );
      const fetchedUsers = await makeFetch(requestData);
      dispatch(fetchedUsersList(fetchedUsers));

      if (!isAdmin) {
        setFetched(true);
      }
    } else if (
      (isAdmin && currentSearchValue) ||
      currentSelectedTeamId !== ''
    ) {
      dispatch(handleIsLoadingChange());
      const requestData = getFilteredUsersRequestData(
        token,
        currentRowsPerPage,
        currentPage,
        currentSelectedTeamId,
        currentSearchValue
      );
      const selectedUsers = await makeFetch(requestData);
      dispatch(fetchedUsersList(selectedUsers));
    }
  };

  const debouncedFetchings = useDebounce(fetchings, 100);

  const handleChangePage = async (newPage) => {
    dispatch(setPage(newPage));
    await fetchings(newPage + 1, rowsPerPage, selectedTeamId, searchValue);
  };

  const handleChangeRowsPerPage = async (value) => {
    dispatch(setRowsPerPage(value));
    dispatch(setPage(0));
    await fetchings(1, value, selectedTeamId, searchValue);
  };

  const handleInputChange = (value) => {
    dispatch(setPage(0));
    setSearchValue(value);
    if (isAdmin) {
      debouncedFetchings(1, rowsPerPage, selectedTeamId, value);
    }
  };

  const handleSelectedTeamChange = async (teamId) => {
    dispatch(setPage(0));
    dispatch(setSelectedTeamId(teamId));
    await fetchings(1, rowsPerPage, teamId, searchValue);
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
      dispatch(setPage(page - 1));
    }
  }, [users.data?.length, page, usersCount, rowsPerPage, dispatch]);

  useEffect(() => {
    dispatch(fetchTeams(token));
  }, [dispatch, token]);

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
              defaultValue={selectedTeamObj}
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
