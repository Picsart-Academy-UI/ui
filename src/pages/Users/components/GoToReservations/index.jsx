import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';

const GoToReservations = ({ userId }) => {
  const history = useHistory();
  const handleBtnClick = () => {
    history.push(`/reservations?user_id=${userId}`);
  };

  return (
    <Button title="Reservations" color="primary" onClick={handleBtnClick}>
      <SpeakerNotesOutlinedIcon />
    </Button>
  );
};

export default GoToReservations;
