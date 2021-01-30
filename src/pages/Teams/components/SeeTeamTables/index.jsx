import { Button } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../../../hooks/useStylesMain';

const SeeTeamTables = ({ id }) => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleTableCountClick = () => {
    history.push(`/teams/${id}/tables`);
  };

  return (
    <Button title="Show Tables" onClick={handleTableCountClick} color="primary">
      <DashboardIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default SeeTeamTables;
