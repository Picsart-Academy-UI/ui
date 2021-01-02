import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useFetch from '../../hooks/useFetch';
import getUserInvitationRequestData from '../../services/users/getUserInvitationRequestData';
import useStylesLocal from './style';

const UsersInvite = () => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const classesLocal = useStylesLocal();

  const [dateType, setDateType] = useState('text');

  const onDateTypeFocus = () => {
    console.log(dateType);
    setDateType('date');
  };

  const onDateTypeBlur = () => {
    console.log(dateType);
    setDateType('text');
  };

  const [checkedB, setCheckedB] = useState(false);

  const handleChange = (event) => {
    setCheckedB(event.target.checked);
  };

  const emailRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const birthDayRef = useRef();
  const teamRef = useRef();
  const positionRef = useRef();
  const phoneNumberRef = useRef();
  const adminRef = useRef();

  const onSendInvitationSubmit = async (e) => {
    e.preventDefault();

    const body = {
      is_admin: adminRef.current.checked,
      email: emailRef.current.value,
      team_id: teamRef.current.value,
      position: positionRef.current.value,
      first_name: nameRef.current.value,
      last_name: surnameRef.current.value,
      birthdate: birthDayRef.current.value,
      phonenumber: phoneNumberRef.current.value,
    };

    const { url, options } = getUserInvitationRequestData({ token, body });

    try {
      const res = await makeRequest(url, options);

      console.log(res);
      if (res.success) {
        console.log(res.msg);

        adminRef.current.checked = false;
        emailRef.current.value = '';
        teamRef.current.value = '';
        positionRef.current.value = '';
        nameRef.current.value = '';
        surnameRef.current.value = '';
        birthDayRef.current.value = '';
        setDateType('text');
        phoneNumberRef.current.value = '';
        return true;
      }
      return false;
    } catch (err) {
      return new Error(err.message);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <form noValidate={false} onSubmit={onSendInvitationSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              inputRef={nameRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              inputRef={surnameRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="date"
              label="Birthday"
              type={dateType}
              onFocus={onDateTypeFocus}
              onBlur={onDateTypeBlur}
              inputRef={birthDayRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="team"
              label="Team"
              defaultValue="5fe23d54a710eb52a9fe0835"
              disabled
              inputRef={teamRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="position"
              label="Position"
              inputRef={positionRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              inputRef={phoneNumberRef}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedB}
                  onChange={handleChange}
                  name="admin"
                  color="primary"
                  inputRef={adminRef}
                />
              }
              label="Admin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classesLocal.sbmtButton}
            >
              Send Invitation
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UsersInvite;
