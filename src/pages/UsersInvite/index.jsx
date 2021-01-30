import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatISO } from 'date-fns';
import useFetch from '../../hooks/useFetch';
import { getUserInvitationRequestData } from '../../services/users';
import BackButton from '../../components/BackButton';
import Form from './components/Form';
import PositionedSnackbar from './components/SnackBar';

const UserInvite = () => {
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  const makeRequest = useFetch();

  const [isRequestNow, setIsRequestNow] = useState(false);

  const [message, setMessage] = useState({
    msg: '',
    severity: 'info',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = useCallback(
    async (values, resetValues) => {
      setIsRequestNow(true);
      const body = { ...values };
      const teamItem = teams.find(
        ({ team_name }) => team_name === values.team_id
      );
      body.team_id = teamItem._id;
      console.log(values.birthday);
      body.birthday = formatISO(new Date(values.birthday));
      console.log(body.birthday);
      const res = await makeRequest(
        getUserInvitationRequestData({ token, body })
      );

      // console.log(res);

      if (res.data) {
        resetValues();
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
    [makeRequest, teams, token]
  );

  // console.log(isSubmitted, message);

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

export default UserInvite;
