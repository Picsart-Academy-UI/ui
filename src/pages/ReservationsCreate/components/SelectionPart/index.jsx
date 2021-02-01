import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from '@material-ui/core';
import {
  createRange,
  calculateDiffInDays,
  transformLocalToAMT,
} from '../../../../utils/dateHelper';
import Pickers from '../Pickers';
import TableOfTables from '../TableOfTables';
import useStylesMain from '../../../../hooks/useStylesMain';
import useStylesLocal from './style';

const SelectionPart = ({
  refFrom,
  refTo,
  dateRange,
  data,
  setDateRange,
  handleSubmit,
}) => {
  const reservations = useSelector(
    (state) => state.reservations.selectedReservations
  );
  const [error, setError] = useState('none');
  const classesLocal = useStylesLocal();
  const classesMain = useStylesMain();

  // handles the event of changing the date in date picker
  const handleEvent = () => {
    // error handling
    const start = new Date(refFrom.current.value);
    const stop = new Date(refTo.current.value);
    const diffFromToday = calculateDiffInDays(
      start,
      transformLocalToAMT(new Date())
    );

    const diffFromTo = calculateDiffInDays(start, stop);

    if (diffFromToday < 0 && (start > stop || diffFromTo < -29)) {
      setError('both');
      return;
      // eslint-disable-next-line
    } else if (diffFromToday <= 0) {
      setError('from');
      return;
      // eslint-disable-next-line
    } else if (start > stop || diffFromTo < -29) {
      setError('to');
      return;
      // eslint-disable-next-line
    } else {
      setError('none');
    }

    const range = createRange(start, stop);
    // should send a request to get the chair
    setDateRange(range);
  };

  return (
    <>
      <Pickers
        refTo={refTo}
        refFrom={refFrom}
        handleEvent={handleEvent}
        error={error}
      />
      <Container className={classesLocal.tableCont}>
        <TableOfTables dateRange={dateRange} data={data} />
      </Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className={`${classesLocal.submitBtn} ${classesMain.commonButton}`}
        disabled={reservations.length === 0 || error !== 'none'}
      >
        {' '}
        Submit{' '}
      </Button>
    </>
  );
};

export default memo(SelectionPart);
