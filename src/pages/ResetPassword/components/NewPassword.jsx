import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStylesCustom from '../useStylesCustom';

const NewPassword = ({ onResetPasswordClick }) => {
  const classesCustom = useStylesCustom();

  return (
    <form className={classesCustom.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        autoFocus
      />
      <div className={classesCustom.right}>
        <Button
          type="submit"
          variant="outlined"
          className={classesCustom.submitRight}
          onClick={onResetPasswordClick}
        >
          Change
        </Button>
      </div>
    </form>
  );
};

export default NewPassword;
