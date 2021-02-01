import { useMemo, useCallback, memo } from 'react';
import { TableCell } from '@material-ui/core';
import useReservation from '../../hooks/useReservation';
import useStyles from './style';

const ChairTableCell = ({
  date,
  reservations,
  chairName,
  chairId,
  tableId,
  choseChair,
}) => {
  const { getReservationOnSameDate } = useReservation();

  const reservOnSameDate = getReservationOnSameDate(reservations, date.date);
  const isSelected =
    reservOnSameDate && reservOnSameDate.chairName === chairName;
  const isNotWeekendDay = date.date.getDay() !== 0 && date.date.getDay() !== 6;
  // console.log(isSelected, chairName, reservations);

  const text = useMemo(() => {
    if (isNotWeekendDay) {
      if (date.isFree) {
        return 'free';
        // eslint-disable-next-line
      } else {
        return 'reserved';
      }
    }
    return undefined;
  }, [date.isFree]);

  const choseCallback = useCallback(() => {
    // eslint-disable-next-line
    if (isNotWeekendDay && date.isFree) {
      choseChair({
        ...date,
        chairName,
        id: chairId,
        table_id: tableId,
      });
    }
  }, [date, reservations]);

  const styles = useStyles();

  return (
    <TableCell
      onClick={choseCallback}
      className={`${isNotWeekendDay ? '' : styles.weekend} ${
        date.isFree ? styles.freeChair : styles.reservedChair
      } ${isSelected ? styles.selected : ''} `}
    >
      {text}
    </TableCell>
  );
};

export default memo(ChairTableCell);
