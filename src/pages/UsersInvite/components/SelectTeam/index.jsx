import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStylesLocal, { getStyleMenuItem } from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'team 1',
  'team 2',
  'team 3',
  'team 4',
  'team 5',
  'team 6',
  'team 7',
];

const SimpleSelect = () => {
  const classesLocal = useStylesLocal();
  const theme = useTheme();
  const [personName, setPersonName] = useState('');
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  return (
    <FormControl
      variant="outlined"
      className={classesLocal.formControl}
      margin="normal"
      required
      fullWidth
    >
      <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={personName}
        onChange={handleChange}
        label="Team"
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyleMenuItem(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
