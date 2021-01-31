export const unique = (arr) => [...new Set(arr)];

export const createRequestData = (user, date, seat, load, reservationId) => ({
  user,
  date,
  seat,
  load,
  reservationId,
});

export const getYear = (start_date, end_date) => {
  const start = new Date(start_date).getFullYear();
  const end = new Date(end_date).getFullYear();
  if (start !== end) {
    return `${start}-${end}`;
  }
  return start;
};

export const workingDaysBetweenDates = (start, end) => {
  if (!start || !end) {
    return null;
  }
  const startDate = start;
  const endDate = end;
  if (endDate < startDate) return 0;

  const millisecondsPerDay = 86400 * 1000;
  startDate.setHours(0, 0, 0, 1);
  endDate.setHours(23, 59, 59, 999);
  const diff = endDate - startDate;
  let days = Math.ceil(diff / millisecondsPerDay);

  const weeks = Math.floor(days / 7);
  days -= weeks * 2;

  const startDay = startDate.getDay();
  const endDay = endDate.getDay();

  if (startDay - endDay > 1) days -= 2;

  if (startDay === 0 && endDay !== 6) days -= 1;

  if (endDay === 6 && startDay !== 0) days -= 1;

  return days;
};
