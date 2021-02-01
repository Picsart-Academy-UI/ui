import useDate from '../../../hooks/useDate';

const useReservation = () => {
  const { withoutHours, getNextPrevDays } = useDate();

  const getReservationOnSameDate = (reservArr, date) =>
    // console.log(reservArr)
    reservArr.find(
      (res) =>
        withoutHours(date) >= withoutHours(res.start_date) &&
        withoutHours(date) <= withoutHours(res.end_date)
    );

  const getReservationsAvailableMerging = (reservArr, name, date) =>
    reservArr.find(({ start_date, end_date, chairName }) => {
      const { nextDay, prevDay } = getNextPrevDays(date);
      return (
        (nextDay.getDate() === start_date.getDate() && chairName === name) ||
        (prevDay.getDate() === end_date.getDate() && chairName === name)
      );
    });

  return { getReservationOnSameDate, getReservationsAvailableMerging };
};

export default useReservation;
