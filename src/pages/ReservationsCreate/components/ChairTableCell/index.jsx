import { useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableCell } from '@material-ui/core';
import { getReservationOnSameDate } from '../../../../utils/reservationHelper';
import { setSelectedReservations } from '../../../../store/slices/reservationsSlice';
import useStyles from './style';

const ChairTableCell = ({ date, chairName, chairId, tableId }) => {
  const reservations = useSelector(
    (state) => state.reservations.selectedReservations
  );
  const dispatch = useDispatch();
  const reservOnSameDate = getReservationOnSameDate(reservations, date.date);
  const isSelected =
    reservOnSameDate && reservOnSameDate.chairName === chairName;
  const choseCallback = useCallback(() => {
    if (date.status === 'free') {
      dispatch(
        setSelectedReservations({
          ...date,
          chairName,
          id: chairId,
          table_id: tableId,
        })
      );
    }
  }, [date, chairName, chairId, tableId, dispatch]);

  const styles = useStyles();
  return (
    <TableCell
      onClick={choseCallback}
      className={`${styles[date.status]} ${isSelected ? styles.selected : ''} `}
    >
      {date.status}
    </TableCell>
  );
};

export default memo(ChairTableCell);
