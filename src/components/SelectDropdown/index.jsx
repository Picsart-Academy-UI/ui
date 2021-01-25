import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setLocalValue(defaultValue);
  }, [defaultValue]);

  const onSelectChange = (event, newValue) => {
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
      value={currentValue || null}
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
