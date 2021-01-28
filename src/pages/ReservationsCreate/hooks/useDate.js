const useDate = () => {
  // creates an Array of dates
  const createRange = (start, stop) => {
    const range = [];
    const currentDate = new Date(start);
    while (currentDate <= stop) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  // returns the date without houts
  const withoutHours = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0);
    return newDate;
  };

  // calculates the differance between two days
  const calculateDiffInDays = (start, stop) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((start - stop) / oneDay);
  };

  // gets next and previous dates of the given date
  const getNextPrevDays = (date) => {
    const nextDay = new Date(date);
    const prevDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    prevDay.setDate(prevDay.getDate() - 1);
    return { nextDay, prevDay };
  };

  const transformDateLocale = (date) =>
    date.toLocaleString('default', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });

  const transformDataISO = (date) => date.toISOString().slice(0, 10);

  return {
    createRange,
    withoutHours,
    calculateDiffInDays,
    getNextPrevDays,
    transformDateLocale,
    transformDataISO,
  };
};

export default useDate;
