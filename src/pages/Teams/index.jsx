import React from 'react';

import TeamsTable from './components/TeamsTable';
import AddTeam from './components/AddTeam';
import SearchBox from './components/SearchBox';

const Teams = () => (
    <>
      <SearchBox />
      <AddTeam />
      <TeamsTable />
    </>
  );

export default Teams;
