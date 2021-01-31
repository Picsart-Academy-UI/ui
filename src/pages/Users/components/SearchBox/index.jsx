import { TextField } from '@material-ui/core';

const SearchBox = ({ value, onChange, onChangePage }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
    onChangePage(0);
  };

  return (
    <TextField
      onChange={handleInputChange}
      name="searchTeam"
      value={value}
      id="searchTeam"
      placeholder="Search by name"
    />
  );
};

export default SearchBox;
