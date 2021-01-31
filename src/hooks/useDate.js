import {
  format,
  parseISO,
  differenceInDays,
  addDays,
  subDays,
  startOfDay,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

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
  const calculateDiffInDays = (start, stop) =>
    differenceInDays(startOfDay(start), startOfDay(stop));

  // gets next and previous dates of the given date
  const getNextPrevDays = (date) => ({
    nextDay: addDays(date, 1),
    prevDay: subDays(date, 1),
  });

  const transformDateLocale = (date) => format(date, 'MMM d  y');

  const transformDataISO = (date) => date.toISOString().slice(0, 10);

  const transformISOToAMT = (date) => {
    const timezone = 'AMT';
    console.log(zonedTimeToUtc(date, timezone));
    return zonedTimeToUtc(date, timezone);
  };

  const transformFromISOToLocal = (date) => parseISO(date);

  const transformFromISOToFormat = (date) =>
    transformDateLocale(transformFromISOToLocal(date));

  return {
    createRange,
    withoutHours,
    calculateDiffInDays,
    getNextPrevDays,
    transformDateLocale,
    transformDataISO,
    transformFromISOToLocal,
    transformISOToAMT,
    transformFromISOToFormat,
  };
};

export default useDate;
