import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from './style';

const TableOfTables = ({ dateRange, reservations, choseRow, choseChair }) => {
  const styles = useStyles();
  const dates = [];
  dateRange.map((item) => {
    if (item.getDate() % 2) {
      dates.push({ date: item, isFree: true });
    } else {
      dates.push({ date: item, isFree: false });
    }
    return '';
  });
  const data = [
    { name: '1/12', dates, id: '1' },
    { name: '2/12', dates, id: '11' },
    { name: '3/12', dates, id: '111' },
    { name: '4/12', dates, id: '1111' },
    { name: '5/12', dates, id: '11111' },
    { name: '6/12', dates, id: '111111' },
    { name: '7/12', dates, id: '1111111' },
    { name: '8/12', dates, id: '11111111' },
    { name: '9/12', dates, id: '111111111' },
    { name: '10/12', dates, id: '1111111111' },
    { name: '11/12', dates, id: '11111111111' },
    { name: '12/12', dates, id: '111111111111' },
  ];

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
                  (reservation) => reservation.date === date.date
                );
                const isSelected =
                  reservOnSameDate && reservOnSameDate.chair === item.name;
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
                      if (isNotWeekendDay) {
                        if (date.isFree) {
                          choseChair(
                            { ...date, chair: item.name, id: item.id },
                            false
                          );
                        } else if (!date.isFree) {
                          choseChair(
                            { ...date, chair: item.name, id: item.id },
                            true
                          );
                        }
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
