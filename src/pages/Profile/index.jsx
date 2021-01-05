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
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setNotMe } from '../../store/slices/profileSlice';
import TeamList from './components/TeamList';
import useStylesLocal from './style';

const Profile = (props) => {
  const classesLocal = useStylesLocal();
  const dispatch = useDispatch();

  const { curUser } = useSelector((state) => state.signin);

  const { id } = props.match.params;

  id && props.location.user && dispatch(setNotMe(props.location.user));

  const user = useSelector((state) => state.profile.notme) || curUser;

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
            <Typography color="textPrimary" variant="h3">
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              className={classesLocal.emailField}
            >
              {user.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Grid container direction="column" justify="center" alignItems="center">
        <Typography className={classesLocal.positionHeader}>Team:</Typography>
        <FormControl className={classesLocal.formControl}>
          <Select native id="grouped-native-select">
            <optgroup disabled>
              <TeamList curUserTeam={user.team_id} />
            </optgroup>
          </Select>
        </FormControl>
        <Typography className={classesLocal.positionHeader}>
          Position:
        </Typography>
        <TextField
          className={classesLocal.positionField}
          value={user.position}
          disabled
        />
        <Button className={classesLocal.sbmtButton}>Submit Change</Button>
      </Grid>
    </>
  );
};

export default Profile;
