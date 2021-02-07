import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTableCreateRequestData } from '../../services/tablesService';
import { addTable } from '../../store/slices/tablesSlice';
import makeFetch from '../../services';
import BackButton from '../../components/BackButton';
import PositionedSnackbar from '../../components/PositionedSnackbar';
import Form from './components/Form';

const TableCreate = () => {
  const dispatch = useDispatch();
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));
  const [isRequestNow, setIsRequestNow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState({
    msg: '',
    severity: 'info',
  });

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
        dispatch(addTable(res.data));
        setIsSubmitted((prevState) => {
          if (!prevState) {
            setMessage({ msg: 'Success.', severity: 'success' });
            setIsRequestNow(false);
          }
          return true;
        });
      }
      if (res.error) {
        setIsSubmitted((prevState) => {
          if (!prevState) {
            setMessage({ msg: res.error, severity: 'error' });
            setIsRequestNow(false);
          }
          return true;
        });
      }
    },
    [token, teams, dispatch]
  );

  return (
    <>
      <BackButton />
      <Form submitForm={submitForm} isRequestNow={isRequestNow} />
      {isSubmitted && (
        <PositionedSnackbar
          message={message}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          setMessage={setMessage}
        />
      )}
    </>
  );
};

export default TableCreate;
