import { MAIN_URL } from '../constants';
import { getHeaders } from './utils';

export const getReservations = (token, query) =>
  new Request(`${MAIN_URL}reservations?${query}`, {
    headers: getHeaders(token),
  });

export const approveReservation = (token, id) =>
  new Request(`${MAIN_URL}reservations/${id}`, {
    headers: getHeaders(token),
    method: 'PUT',
    body: { status: 'approved' },
  });

export const rejectReservation = (token, id) =>
  new Request(`${MAIN_URL}reservations/${id}`, {
    headers: getHeaders(token),
    method: 'PUT',
    body: { status: 'rejected' },
  });

export const deleteReservation = (token, resId) =>
  new Request(`${MAIN_URL}reservations/${resId}`, {
    headers: getHeaders(token),
    method: 'DELETE',
  });

export const seeLoad = (token, start, end, teamId) =>
  new Request(
    `${MAIN_URL}reservations/seeload?start_date=${start}&end_date=${end}&team_id=${teamId}`,
    {
      headers: getHeaders(token),
    }
  );

export const postReservation = (token, body) =>
  new Request(`${MAIN_URL}reservations`, {
    headers: getHeaders(token),
    method: 'POST',
    body,
  });
