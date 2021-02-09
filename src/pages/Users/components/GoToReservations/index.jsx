import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import useStylesMain from '../../../../hooks/useStylesMain';

const GoToReservations = ({ user }) => {
  const classesMain = useStylesMain();

  const history = useHistory();
  const handleBtnClick = () => {
    history.push(`/reservations?user_id=${user._id}`, { ...user });
  };

  return (
    <Button title="Reservations" color="primary" onClick={handleBtnClick}>
      <SpeakerNotesOutlinedIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default GoToReservations;
