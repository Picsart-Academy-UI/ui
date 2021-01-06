import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
