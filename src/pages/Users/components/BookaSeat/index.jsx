import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EventSeatOutlinedIcon from '@material-ui/icons/EventSeatOutlined';
import useStylesMain from '../../../../hooks/useStylesMain';

const BookaSeat = ({ user }) => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleClick = () =>
    history.push(
      `/reservations/create?id=${user._id}&team_id=${user.team_id}`,
      { ...user }
    );

  return (
    <Button title="Book a Seat" color="primary" onClick={handleClick}>
      <EventSeatOutlinedIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default BookaSeat;
