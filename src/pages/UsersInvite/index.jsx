import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatISO } from 'date-fns';
import makeFetch from '../../services';
import { getUserInvitationRequestData } from '../../services/usersService';
import BackButton from '../../components/BackButton';
import Form from './components/Form';
import PositionedSnackbar from './components/SnackBar';

const UserInvite = () => {
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
    async (values, resetValues) => {
      setIsRequestNow(true);
      const body = { ...values };
      const teamItem = teams.find(
        ({ team_name }) => team_name === values.team_id
      );
      body.team_id = teamItem._id;
      body.birthday = values.birthday
        ? formatISO(new Date(values.birthday))
        : '';
      const res = await makeFetch(
        getUserInvitationRequestData({ token, body })
      );

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
    [teams, token]
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

export default UserInvite;
