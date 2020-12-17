import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStylesCustom from '../useStylesCustom';

const MailInput = ({
  onCancelForgotPasswordClick,
  onContinueResetPasswordClick,
}) => {
  const classesCustom = useStylesCustom();

  return (
    <form className={classesCustom.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <div className={classesCustom.right}>
        <Button
          type="submit"
          variant="outlined"
          className={classesCustom.submitRight}
          onClick={onContinueResetPasswordClick}
        >
          Continue
        </Button>
        <Button
          type="submit"
          variant="outlined"
          className={classesCustom.submitRight}
          onClick={onCancelForgotPasswordClick}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default MailInput;
