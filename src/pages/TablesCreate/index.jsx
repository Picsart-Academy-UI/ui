import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTableCreateRequestData } from '../../services/tablesService';
import { addTable } from '../../store/slices/tablesSlice';
import makeFetch from '../../services';
import BackButton from '../../components/BackButton';
import Form from './components/Form';

const TableCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));
  const [isRequestNow, setIsRequestNow] = useState(false);
  const submitForm = useCallback(
    async (values) => {
      setIsRequestNow(true);
      const body = { ...values };
      const teamItem = teams.find(
        ({ team_name }) => team_name === values.team_id
      );
      body.team_id = teamItem._id;

      const res = await makeFetch(getTableCreateRequestData({ token, body }));

      if (res.data) {
        setIsRequestNow(false);
        dispatch(addTable(res.data));
        history.push('/tables');
      }
    },
    [token, teams]
  );

  return (
    <>
      <BackButton />
      <Form submitForm={submitForm} isRequestNow={isRequestNow} />
    </>
  );
};

export default TableCreate;
