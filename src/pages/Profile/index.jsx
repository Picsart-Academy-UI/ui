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
import useStylesLocal from './style';

const Profile = () => {
  const classesLocal = useStylesLocal();

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
              {'John Picsartian' /* user.name + user.surname */}
            </Typography>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              className={classesLocal.emailField}
            >
              {'john@picsart.com' /* user.email */}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Grid container direction="column" justify="center" alignItems="center">
        <Typography className={classesLocal.positionHeader}>Team:</Typography>
        <FormControl className={classesLocal.formControl}>
          <Select native id="grouped-native-select">
            <optgroup label="Image Processing" disabled>
              <option value={1}>Team 1</option>
              <option value={2}>Team 2</option>
            </optgroup>
            <optgroup label="Website" disabled>
              <option value={3} selected>
                Team 1
              </option>
              <option value={4}>Team 2</option>
            </optgroup>
          </Select>
        </FormControl>
        <Typography className={classesLocal.positionHeader}>
          Position:
        </Typography>
        <TextField
          className={classesLocal.positionField}
          value="Software Engineer 9 3/4"
          disabled
        />
        {/* user.position */}
        <Button className={classesLocal.sbmtButton}>Submit Change</Button>
      </Grid>
    </>
  );
};

export default Profile;
