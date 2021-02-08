import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatISO } from 'date-fns';
import makeFetch from '../../services';
import { getUserInvitationRequestData } from '../../services/usersService';
import BackButton from '../../components/BackButton';
import PositionedSnackbar from '../../components/PositionedSnackbar';
import Form from './components/Form';

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

      const teamItem = teams.find(
        ({ team_name }) => team_name === values.team_id
      );

      const body = {
        email: values.email.trim(),
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        birthday: values.birthday,
        phone: values.phone.phoneNumber?.number,
        team_id: teamItem._id,
        position: values.position.trim(),
        is_admin: values.is_admin,
      };

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
            setMessage({
              msg: 'User successfully invited.',
              severity: 'success',
            });
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
