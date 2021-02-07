import { getNextPrevDays, withoutHours, transformISOToAMT } from './dateHelper';

export const getReservationOnSameDate = (reservArr, date) =>
  reservArr.find((res) => {
    const dateAMT = transformISOToAMT(date);
    const startDateAMT = transformISOToAMT(res.start_date);
    const endDateAMT = transformISOToAMT(res.end_date);
    return (
      withoutHours(dateAMT) >= withoutHours(startDateAMT) &&
      withoutHours(dateAMT) <= withoutHours(endDateAMT)
    );
  });
export const getReservationsOnSameDate = (reservArr, date) =>
  reservArr.filter((res) => {
    const dateAMT = transformISOToAMT(date);
    const startDateAMT = transformISOToAMT(res.start_date);
    const endDateAMT = transformISOToAMT(res.end_date);
    return (
      withoutHours(dateAMT) >= withoutHours(startDateAMT) &&
      withoutHours(dateAMT) <= withoutHours(endDateAMT)
    );
  });

export const getReservationsAvailableMerging = (reservArr, name, date) =>
  reservArr.filter(({ start_date, end_date, chairName }) => {
    const { nextDay, prevDay } = getNextPrevDays(transformISOToAMT(date));
    const startDate = transformISOToAMT(start_date);
    const endDate = transformISOToAMT(end_date);
    return (
      (nextDay.getDate() === startDate.getDate() && chairName === name) ||
      (prevDay.getDate() === endDate.getDate() && chairName === name)
    );
  });

export const deleteFromRes = (chair, res, newReservations) => {
  const index = newReservations.indexOf(res);
  const { nextDay, prevDay } = getNextPrevDays(transformISOToAMT(chair.date));
  const startDate = transformISOToAMT(res.start_date);
  const endDate = transformISOToAMT(res.end_date);
  const currDate = transformISOToAMT(chair.date);
  const dayOfDate = currDate.getDate();
  const endDay = endDate.getDate();
  const startDay = startDate.getDate();

  if (startDay === endDay) {
    newReservations.splice(index, 1);
  } else if (dayOfDate === startDay) {
    newReservations[index] = {
      ...newReservations[index],
      start_date: nextDay.toISOString(),
    };
  } else if (dayOfDate === endDay) {
    newReservations[index] = {
      ...newReservations[index],
      end_date: prevDay.toISOString(),
    };
  } else if (currDate > startDate && currDate < endDate) {
    newReservations.push({
      ...newReservations[index],
      start_date: nextDay.toISOString(),
    });

    newReservations[index] = {
      ...newReservations[index],
      end_date: prevDay.toISOString(),
    };
  }
};

export const add = (chair, newReservations) => {
  const resDate = transformISOToAMT(chair.date);
  const resAvailableMerging = getReservationsAvailableMerging(
    newReservations,
    chair.chairName,
    chair.date
  );
  const index0 = newReservations.indexOf(resAvailableMerging[0]);
  const index1 = newReservations.indexOf(resAvailableMerging[1]);

  if (resAvailableMerging.length === 2) {
    const startDate0 = transformISOToAMT(resAvailableMerging[0].start_date);
    const startDate1 = transformISOToAMT(resAvailableMerging[1].start_date);
    if (startDate0 < startDate1) {
      newReservations[index0] = {
        ...newReservations[index0],
        end_date: resAvailableMerging[1].end_date,
      };
    } else {
      newReservations[index0] = {
        ...newReservations[index0],
        start_date: resAvailableMerging[1].start_date,
      };
    }
    newReservations.splice(index1, 1);
  } else if (resAvailableMerging.length === 1) {
    const endDate = transformISOToAMT(resAvailableMerging[0].end_date);
    if (endDate < resDate) {
      newReservations[index0] = {
        ...newReservations[index0],
        end_date: chair.date,
      };
    } else {
      newReservations[index0] = {
        ...newReservations[index0],
        start_date: chair.date,
      };
    }
  } else {
    newReservations.push({
      ...chair,
      start_date: chair.date,
      end_date: chair.date,
    });
  }
};
