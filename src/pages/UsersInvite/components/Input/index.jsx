import { TextField } from '@material-ui/core';
import useStylesLocal from './style';

const Input = (props) => {
  const classesLocal = useStylesLocal();
  return (
    <TextField
      variant="outlined"
      margin="normal"
      {...props}
      className={classesLocal.width}
    />
  );
};

export default Input;
