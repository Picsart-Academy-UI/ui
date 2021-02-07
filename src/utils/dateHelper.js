import {
  format,
  parseISO,
  differenceInDays,
  addDays,
  subDays,
  startOfDay,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

// creates an Array of dates
export const createRange = (start, stop) => {
  const range = [];
  const currentDate = new Date(start);
  while (currentDate <= stop) {
    range.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return range;
};

// returns the date without houts
export const withoutHours = (date) => {
  const newDate = new Date(date);
  return startOfDay(newDate);
};

// calculates the differance between two days
export const calculateDiffInDays = (start, stop) =>
  differenceInDays(startOfDay(start), startOfDay(stop));

// gets next and previous dates of the given date
export const getNextPrevDays = (date) => ({
  nextDay: addDays(date, 1),
  prevDay: subDays(date, 1),
});

export const transformDateLocale = (date) => format(date, 'MMM d  y');

export const transformDataISO = (date) => date.toISOString().slice(0, 10);

export const transformDateToISOFormat = (date) => format(date, 'yyyy-MM-dd');

export const transformISOToAMT = (date) => {
  const timezone = 'AMT';
  return zonedTimeToUtc(date, timezone);
};

export const transformFromISOToLocal = (date) => parseISO(date);

export const transformFromISOToFormat = (date) =>
  transformDateLocale(transformFromISOToLocal(date));

export const transformLocalToAMT = (date) =>
  transformISOToAMT(date.toISOString());
