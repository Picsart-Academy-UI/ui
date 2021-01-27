import { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Filter = ({
  label,
  placeholder = 'Search',
  onChange,
  className,
  ...props
}) => {
  const isControlled = 'value' in props;
  const [localValue, setLocalValue] = useState('');
  const currentValue = isControlled ? props.value : localValue;

  const onInputChange = (event) => {
    if (!isControlled) {
      setLocalValue(event.target.value);
    }
    onChange(event.target.value);
  };

  return (
    <TextField
      className={className}
      value={currentValue}
      onChange={onInputChange}
      placeholder={placeholder}
      id="outlined-search"
      label="Search field"
      type="search"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Filter;
