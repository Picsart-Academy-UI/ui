import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectDropdown = ({
  label,
  options,
  onChange,
  defaultValue = options[0],
  ...props
}) => {
  const isControlled = 'value' in props;
  const { isDisabled, style, variant = 'outlined' } = props;
  const [localValue, setLocalValue] = useState(defaultValue);
  const currentValue = isControlled ? props.value : localValue;

  const onSelectChange = (event, newValue) => {
    console.log('hello');
    if (!isControlled) {
      setLocalValue(newValue);
    }
    onChange(newValue);
  };

  return (
    <Autocomplete
      id={label}
      options={options}
      autoHighlight
      blurOnSelect
      value={currentValue}
      onChange={onSelectChange}
      disableClearable
      getOptionLabel={(option) => option.title}
      getOptionSelected={(option) => option.title}
      style={style}
      disabled={isDisabled}
      renderInput={(params) => (
        <TextField {...params} label={label} variant={variant} />
      )}
    />
  );
};

export default SelectDropdown;
