import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { API_URL_PART } from '../../constants';
import useFetch from '../../hooks/useFetch';
import { getUserInvitationRequestData } from '../../services/users';
import Form from './components/Form';
import PositionedSnackbar from './components/SnackBar';

const UserInvite = () => {
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  const makeRequest = useFetch();

  const [message, setMessage] = useState({
    msg: '',
    severity: 'info',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitForm = useCallback(
    async (values, resetValues) => {
      const body = { ...values };
      const teamItem = teams.find(
        ({ team_name }) => team_name === values.team_id
      );
      body.team_id = teamItem._id;
      body.birthday = new Date(values.birthday);

      const res = await makeRequest(
        getUserInvitationRequestData({
          token,
          body,
          route: API_URL_PART.authIvite,
        })
      );

      // console.log(res);

      if (res.data) {
        resetValues();
        setIsSubmitted((prevState) => {
          if (!prevState) {
            setMessage({ msg: 'Success.', severity: 'success' });
          }
          return true;
        });
      }
      if (res.error) {
        setIsSubmitted((prevState) => {
          if (!prevState) {
            setMessage({ msg: res.error, severity: 'error' });
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
      <Form submitForm={submitForm} />
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
