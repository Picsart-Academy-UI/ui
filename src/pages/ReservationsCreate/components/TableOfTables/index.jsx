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
import Loading from '../../../../components/Loading';
import { transformDateLocale } from '../../../../utils/dateHelper';
import useStyles from './style';

const TableOfTables = ({ dateRange, choseChair, data, isLoading }) => {
  const styles = useStyles();

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
        {isLoading ? (
          <Loading />
        ) : (
          <TableBody>
            {data.map((item) => (
              <ChairTableRow
                key={item.id}
                item={item}
                choseChair={choseChair}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default memo(TableOfTables);
