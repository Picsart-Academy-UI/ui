import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { TableCell, TableRow } from '@material-ui/core';
import { setSelectedRow } from '../../../../store/slices/reservationsSlice';
import ChairTableCell from '../ChairTableCell';
import useStyles from './style';

const ChairTableRow = ({ item }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const choseCallback = useCallback(() => {
    dispatch(setSelectedRow(item));
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
          chairName={item.name}
          chairId={item.id}
          tableId={item.id}
        />
      ))}
    </TableRow>
  );
};

export default memo(ChairTableRow);
