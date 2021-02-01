import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import useStylesMain from '../../../../hooks/useStylesMain';

const BookaSeat = ({ id, team_id }) => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleClick = () =>
    history.push(`/reservations/create?id=${id}&team_id=${team_id}`);

  return (
    <Button title="Book a Seat" color="primary" onClick={handleClick}>
      <EventSeatOutlinedIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default BookaSeat;
