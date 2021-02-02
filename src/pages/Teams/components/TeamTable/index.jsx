import { Button } from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../../../hooks/useStylesMain';

const SeeTeamTables = ({ id }) => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tables/${id}`);
  };

  return (
    <Button title="Show Tables" onClick={handleClick} color="primary">
      <DashboardOutlinedIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default SeeTeamTables;
