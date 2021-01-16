// import { Grid } from '@material-ui/core';
import TeamsTable from './components/TeamsTable';
import AddTeam from './components/AddTeam';
import Search from './components/Search';
import useStylesLocal from './style';

const Teams = () => {
  const classesLocal = useStylesLocal();

  return (
    <>
      <div className={classesLocal.wrapper}>
        <Search />
        <AddTeam />
      </div>
      <TeamsTable />
    </>
  );
};

export default Teams;
