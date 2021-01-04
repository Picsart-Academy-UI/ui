import TextField from '@material-ui/core/TextField';
import useStylesLocal from './style';

const Input = (props) => {
  const classesLocal = useStylesLocal();

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      {...props}
      className={classesLocal.width}
    />
  );
};

export default Input;
