import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import useStyles from './style';

const TableOfTables = ({
  dateRange,
  reservations,
  choseRow,
  choseChair,
  data,
}) => {
  const styles = useStyles();

  return (
    <TableContainer className={styles.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow className={styles.dateRow}>
            <TableCell className={styles.stickyHeaderCell}>Chair</TableCell>
            {dateRange.map((item) => (
              <TableCell className={styles.headerCell} key={item.getDate()}>
                {item.toLocaleString('default', {
                  month: 'short',
                  year: 'numeric',
                  day: 'numeric',
                })}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              classes={{ root: styles.tableRow, selected: styles.selectedRow }}
            >
              <TableCell
                className={styles.tableCell}
                onClick={() => choseRow(item)}
              >
                {item.name}
              </TableCell>
              {item.dates.map((date) => {
                const reservOnSameDate = reservations.find(
                  ({ startDate, endDate }) =>
                    date.date >= startDate && date.date <= endDate
                );
                const isSelected =
                  reservOnSameDate && reservOnSameDate.chairName === item.name;
                const isNotWeekendDay =
                  date.date.getDay() !== 0 && date.date.getDay() !== 6;
                let text = '';
                if (isNotWeekendDay) {
                  if (date.isFree) {
                    text = 'free';
                  } else {
                    text = 'reserved';
                  }
                }
                return (
                  <TableCell
                    onClick={() => {
                      // eslint-disable-next-line
                      if (isNotWeekendDay && date.isFree) {
                        choseChair({
                          ...date,
                          chairName: item.name,
                          id: item.id,
                        });
                      }
                    }}
                    className={`${isNotWeekendDay ? '' : styles.weekend} ${
                      date.isFree ? styles.freeChair : styles.reservedChair
                    } ${isSelected ? styles.selected : ''} `}
                  >
                    {text}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOfTables;
