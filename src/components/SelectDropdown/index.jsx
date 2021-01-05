import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectDropdown = ({
  label,
  options,
  onChange,
  defaultValue = options[0],
  ...props
}) => {
  const isControlled = 'value' in props;
  const [localValue, setLocalValue] = useState(defaultValue);
  const currentValue = isControlled ? props.value : localValue;

  const onSelectChange = (event, newValue) => {
    if (!isControlled) {
      setLocalValue(newValue);
    }
    onChange(newValue);
  };

  return (
    <div>
      <Autocomplete
        id={label}
        options={options}
        autoHighlight
        blurOnSelect
        value={currentValue}
        onChange={onSelectChange}
        disableClearable
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
    </div>
  );
};

export default SelectDropdown;
