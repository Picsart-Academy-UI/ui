import {
  Avatar,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  Hidden,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStylesMain from '../../hooks/useStylesMain';
import { setNotMe } from '../../store/slices/profileSlice';
import { setChangeCurUser } from '../../store/slices/signinSlice';
import updateUserHook from './helpers/updateUser';
import TeamList from './components/TeamList';
import useStylesLocal from './style';

const Profile = (props) => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();

  const dispatch = useDispatch();

  const { curUser } = useSelector((state) => state.signin);

  const [isEditing, setIsEditing] = useState(false);

  const { is_admin: isAdmin } = curUser;

  const { id } = props.match.params;

  const other = useSelector((state) => state.profile.notme);

  const user = (id !== 'me' && other) || curUser;

  const [edited, setEdited] = useState(user);

  useEffect(() => setEdited(user), [user, id]);

  useEffect(() => {
    if (
      (id && id !== 'me' && props.location.state && !other) ||
      (other && props.location.state && other._id !== props.location.state._id)
    ) {
      dispatch(setNotMe(props.location.state));
    }
  }, []);

  const updateUser = updateUserHook();

  const startUpdateUser = () => {
    dispatch(id !== 'me' ? setNotMe(edited) : setChangeCurUser(edited));
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
      <Box alignItems="center" display="flex" flexDirection="column">
        <Avatar className={classesLocal.avatar} src={edited.profile_picture} />
      </Box>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classesLocal.upperGrid}
      >
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
          value={edited.phone || ''}
          disabled={!isEditing}
          onChange={(e) => handleUserEdit('phone', e.target.value)}
        />
        <Typography className={classesLocal.textHeader}>Birthday:</Typography>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          value={
            (edited.birthday &&
              new Date(edited.birthday).toISOString().split('T')[0]) ||
            ''
          }
          className={classesLocal.textField}
          disabled={!isEditing}
          onChange={(e) =>
            handleUserEdit('birthday', new Date(e.target.value).toISOString())
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Hidden xsUp={!isAdmin}>
          <Button
            className={classesMain.picsartButton}
            onClick={handleEnterEditAndSubmit}
          >
            {isEditing ? 'Submit Change' : 'Edit'}
          </Button>
        </Hidden>
        <Hidden xsUp={!isEditing}>
          <Button
            className={classesMain.picsartButton}
            onClick={handleCancel}
            hidden={!isEditing}
          >
            {isEditing ? 'Cancel' : ''}
          </Button>
        </Hidden>
      </Grid>
    </>
  );
};

export default Profile;
