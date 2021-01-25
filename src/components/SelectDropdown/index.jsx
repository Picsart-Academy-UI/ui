import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SelectDropdown = ({
  label,
  options,
  onChange,
  defaultValue = options[0],
  property = 'title',
  ...props
}) => {
  const isControlled = 'value' in props;
  const { className, isDisabled, style, variant = 'outlined' } = props;
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
      className={className}
      options={options}
      autoHighlight
      blurOnSelect
      value={currentValue || null}
      onChange={onSelectChange}
      disableClearable
      getOptionLabel={(option) => option[property]}
      getOptionSelected={(option) => option[property]}
      style={style}
      disabled={isDisabled}
      renderInput={(params) => (
        <TextField {...params} label={label} variant={variant} />
      )}
    />
  );
};

export default SelectDropdown;
