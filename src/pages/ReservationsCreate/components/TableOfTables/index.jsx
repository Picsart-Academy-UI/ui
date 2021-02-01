import { memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ChairTableRow from '../ChairTableRow';
import useDate from '../../../../hooks/useDate';
import useStyles from './style';

const TableOfTables = ({
  dateRange,
  reservations,
  choseRow,
  choseChair,
  data,
}) => {
  const styles = useStyles();
  const { transformDateLocale } = useDate();

  return (
    <TableContainer className={styles.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow className={styles.dateRow}>
            <TableCell className={styles.stickyHeaderCell}>Chair</TableCell>
            {dateRange.map((item) => (
              <TableCell className={styles.headerCell} key={item}>
                {transformDateLocale(item)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <ChairTableRow
              key={item.id}
              item={item}
              reservations={reservations}
              choseRow={choseRow}
              choseChair={choseChair}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(TableOfTables);
