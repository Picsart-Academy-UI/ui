import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

function handleAddTeam() {}
function handleNameChange() {}

const TeamsCreate = () => (
  <form noValidate autoComplete="off">
    <Box display="flex" justifyContent="center">
      <Box mr={3} m={1}>
        <TextField
          onChange={handleNameChange}
          id="standard-basic"
          label="Team Name"
          placeholder="Team name"
        />
      </Box>
      <Box mr={3} m={1}>
        <TextField
          id="standard-basic"
          label="Invite members"
          placeholder="emails"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleAddTeam}>
        Add
      </Button>
    </Box>
  </form>
);

export default TeamsCreate;
