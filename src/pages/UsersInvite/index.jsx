import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
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
    async (values) => {
      const body = { ...values };
      const teamItem = teams.find(({ name }) => name === values.team_id);
      body.team_id = teamItem._id;
      body.position_id = '5fe23d54a710eb52a9fe0835';

      const { url, options } = getUserInvitationRequestData({ token, body });

      const res = await makeRequest(url, options);

      console.log(res);

      if (res.data) {
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

  console.log(isSubmitted, message);

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
