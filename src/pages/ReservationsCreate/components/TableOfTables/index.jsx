import { memo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import useStylesMain from '../../../../hooks/useStylesMain';
import ChairTableRow from '../ChairTableRow';
import { transformDateLocale } from '../../../../utils/dateHelper';
import useStyles from './style';

const TableOfTables = ({ dateRange, choseChair, data }) => {
  const classesMain = useStylesMain();
  const styles = useStyles();

  return (
    <TableContainer
      className={`${styles.container} ${classesMain.tableContainer}`}
    >
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
            <ChairTableRow key={item.id} item={item} choseChair={choseChair} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(TableOfTables);
