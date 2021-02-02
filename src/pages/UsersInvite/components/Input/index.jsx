import { TextField } from '@material-ui/core';
import useStylesMain from '../../../../hooks/useStylesMain';

const Input = (props) => {
  const classesMain = useStylesMain();
  return (
    <TextField
      variant="outlined"
      margin="normal"
      {...props}
      className={classesMain.inputLong}
    />
  );
};

export default Input;
