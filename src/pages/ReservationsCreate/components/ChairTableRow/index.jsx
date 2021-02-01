import { useCallback, memo } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import ChairTableCell from '../ChairTableCell';
import useStyles from './style';

const ChairTableRow = ({ item, choseRow, choseChair, reservations }) => {
  const styles = useStyles();
  const choseCallback = useCallback(() => {
    choseRow(item);
  }, [item]);

  return (
    <TableRow className={styles.tableRow}>
      <TableCell className={styles.tableCell} onClick={choseCallback}>
        {item.name}
      </TableCell>
      {item.dates.map((date) => (
        <ChairTableCell
          key={`${item.id}+${date.date}`}
          date={date}
          choseChair={choseChair}
          chairName={item.name}
          chairId={item.id}
          tableId={item.id}
          reservations={reservations}
        />
      ))}
    </TableRow>
  );
};

export default memo(ChairTableRow);
