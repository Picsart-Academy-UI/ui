import { getNextPrevDays, withoutHours } from './dateHelper';

export const getReservationOnSameDate = (reservArr, date) =>
  // console.log(reservArr)
  reservArr.find(
    (res) =>
      withoutHours(date) >= withoutHours(res.start_date) &&
      withoutHours(date) <= withoutHours(res.end_date)
  );

export const getReservationsAvailableMerging = (reservArr, name, date) =>
  reservArr.filter(({ start_date, end_date, chairName }) => {
    const { nextDay, prevDay } = getNextPrevDays(date);
    return (
      (nextDay.getDate() === start_date.getDate() && chairName === name) ||
      (prevDay.getDate() === end_date.getDate() && chairName === name)
    );
  });

export const deleteFromRes = (chair, res, newReservations) => {
  const index = newReservations.indexOf(res);
  const { nextDay, prevDay } = getNextPrevDays(chair.date);
  const dayOfDate = chair.date.getDate();
  const endDay = res.end_date.getDate();
  const startDay = res.start_date.getDate();

  if (startDay === endDay) {
    newReservations.splice(index, 1);
  } else if (dayOfDate === startDay) {
    newReservations[index] = {
      ...newReservations[index],
      start_date: nextDay,
    };
  } else if (dayOfDate === endDay) {
    newReservations[index] = {
      ...newReservations[index],
      end_date: prevDay,
    };
  } else if (chair.date > res.start_date && chair.date < res.end_date) {
    newReservations.push({
      ...newReservations[index],
      start_date: nextDay,
    });

    newReservations[index] = {
      ...newReservations[index],
      end_date: prevDay,
    };
  }
};

export const add = (chair, newReservations) => {
  const resAvailableMerging = getReservationsAvailableMerging(
    newReservations,
    chair.chairName,
    chair.date
  );
  const index0 = newReservations.indexOf(resAvailableMerging[0]);
  const index1 = newReservations.indexOf(resAvailableMerging[1]);

  if (resAvailableMerging.length === 2) {
    if (resAvailableMerging[0].start_date < resAvailableMerging[1].start_date) {
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
    if (resAvailableMerging[0].end_date < chair.date) {
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
