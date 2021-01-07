import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  Hidden,
} from '@material-ui/core';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotMe } from '../../store/slices/profileSlice';
import setChangeCurUser from '../../store/slices/signinSlice';
import findTeam from './helpers/findTeam';
import updateUserHook from './helpers/updateUser';
import TeamList from './components/TeamList';
import useStylesLocal from './style';

const Profile = (props) => {
  const classesLocal = useStylesLocal();

  const dispatch = useDispatch();

  const { curUser } = useSelector((state) => state.signin);

  const refs = {
    name: useRef(),
    last_name: useRef(),
    email: useRef(),
    team: useRef(),
    position: useRef(),
  };

  const [isEditing, setIsEditing] = useState(false);

  const { is_admin: isAdmin } = curUser;

  const { id } = props.match.params;

  id && props.location.user && dispatch(setNotMe(props.location.user));

  const user = useSelector((state) => state.profile.notme) || curUser;

  const [edited, setEdited] = useState(user);

  const updateUser = updateUserHook();

  const startUpdateUser = () => {
    const teamId = findTeam(refs.team.current.children[0]);
    const final = { ...edited, team_id: teamId };
    id ? dispatch(setNotMe(final)) : dispatch(setChangeCurUser(final));
    updateUser(final);
  };

  const handleUserEdit = (field, ref) => {
    const editedUser = { ...edited, [field]: ref.current.value };
    setEdited(editedUser);
  };

  const handleEnterEditAndSubmit = () =>
    !isEditing ? setIsEditing(true) : startUpdateUser() || setIsEditing(false);
  const handleCancel = () =>
    (isEditing && setIsEditing(false)) || setEdited(user);

  return (
    <>
      <Card>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Button
              variant="contained"
              component="label"
              className={classesLocal.chngAvtr}
            >
              <input type="file" hidden />
              <Avatar
                className={classesLocal.avatar}
                src={
                  'https://play-lh.googleusercontent.com/YFpMBVjnTFQ9D7ln9jOPDxCwTf_AUPgNU0Tz8uskVP-0Esj_5jqBDpqcPm0LwDpcLA'
                }
              />
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Grid container direction="column" justify="center" alignItems="center">
        <Typography className={classesLocal.textHeader}>Name:</Typography>
        <TextField
          className={classesLocal.textField}
          disabled={!isEditing}
          value={edited.first_name}
          inputRef={refs.name}
          onChange={() => handleUserEdit('first_name', refs.name)}
        />
        <Typography className={classesLocal.textHeader}>Surname:</Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.last_name}
          disabled={!isEditing}
          inputRef={refs.last_name}
          onChange={() => handleUserEdit('last_name', refs.last_name)}
        />
        <Typography className={classesLocal.textHeader}>Email:</Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.email}
          disabled={!isEditing}
          inputRef={refs.email}
          onChange={() => handleUserEdit('email', refs.email)}
        />
        <Typography className={classesLocal.textHeader}>Team:</Typography>
        <FormControl className={classesLocal.formControl}>
          <Select
            native
            disabled={!isEditing}
            ref={refs.team}
            defaultValue={10}
          >
            <option></option>
            <TeamList userTeam={user.team_id} />
          </Select>
        </FormControl>
        <Typography className={classesLocal.textHeader}>Position:</Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.position}
          disabled={!isEditing}
          inputRef={refs.position}
          onChange={() => handleUserEdit('position', refs.position)}
        />
        <Hidden xsUp={!isAdmin}>
          <Button
            className={classesLocal.sbmtButton}
            onClick={handleEnterEditAndSubmit}
          >
            {isEditing ? 'Submit Change' : 'Edit'}
          </Button>
        </Hidden>
        <Hidden xsUp={!isEditing}>
          <Button
            className={classesLocal.sbmtButton}
            onClick={handleCancel}
            hidden={!isEditing}
          >
            {isEditing ? 'Cancel' : 'Test'}
          </Button>
        </Hidden>
      </Grid>
    </>
  );
};

export default Profile;
