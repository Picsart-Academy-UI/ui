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
  Hidden,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotMe } from '../../store/slices/profileSlice';
import setChangeCurUser from '../../store/slices/signinSlice';
import updateUserHook from './helpers/updateUser';
import TeamList from './components/TeamList';
import useStylesLocal from './style';

const Profile = (props) => {
  const classesLocal = useStylesLocal();

  const dispatch = useDispatch();

  const { curUser } = useSelector((state) => state.signin);

  const [isEditing, setIsEditing] = useState(false);

  const { is_admin: isAdmin } = curUser;

  const { id } = props.match.params;

  // eslint-disable-next-line
  id && props.location.user && dispatch(setNotMe(props.location.user));

  const user = useSelector((state) => state.profile.notme) || curUser;

  const [edited, setEdited] = useState(user);

  const updateUser = updateUserHook();

  const startUpdateUser = () => {
    id ? dispatch(setNotMe(edited)) : dispatch(setChangeCurUser(edited));
    updateUser(edited);
  };

  const handleUserEdit = (field, value) => {
    const editedUser = { ...edited, [field]: value };
    setEdited(editedUser);
  };

  const handleEnterEditAndSubmit = () =>
    !isEditing ? setIsEditing(true) : startUpdateUser() || setIsEditing(false);
  const handleCancel = () =>
    (isEditing && setIsEditing(false)) || setEdited({ ...user });

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
          value={edited.first_name || ''}
          onChange={(e) => handleUserEdit('first_name', e.target.value)}
        />
        <Typography className={classesLocal.textHeader}>Surname:</Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.last_name || ''}
          disabled={!isEditing}
          onChange={(e) => handleUserEdit('last_name', e.target.value)}
        />
        <Typography className={classesLocal.textHeader}>Email:</Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.email || ''}
          disabled={!isEditing}
          onChange={(e) => handleUserEdit('email', e.target.value)}
        />
        <Typography className={classesLocal.textHeader}>Team:</Typography>
        <FormControl className={classesLocal.formControl}>
          <TeamList
            userTeam={user.team_id}
            changeCallback={(newValue) =>
              handleUserEdit('team_id', newValue.id)
            }
            isEditing={isEditing}
          />
        </FormControl>
        <Typography className={classesLocal.textHeader}>Position:</Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.position || ''}
          disabled={!isEditing}
          onChange={(e) => handleUserEdit('position', e.target.value)}
        />
        <Typography className={classesLocal.textHeader}>
          Phone Number:
        </Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.phoneNumber || ''}
          disabled={!isEditing}
          onChange={(e) => handleUserEdit('phone_number', e.target.value)}
        />
        <Typography className={classesLocal.textHeader}>Birthdate:</Typography>
        <TextField
          className={classesLocal.textField}
          value={edited.birthdate || ''}
          disabled={!isEditing}
          onChange={(e) => handleUserEdit('birthdate', e.target.value)}
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
