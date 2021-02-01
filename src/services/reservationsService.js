import makeRequest from '../utils/makeRequest';
import { getHeaders } from './utils';

export const getReservations = (token, query) =>
  makeRequest(`reservations?${query}`, {
    headers: getHeaders(token),
  });

export const approveReservation = (token, id) =>
  makeRequest(`reservations/${id}`, {
    headers: getHeaders(token),
    method: 'PUT',
    body: { status: 'approved' },
  });

export const rejectReservation = (token, id) =>
  makeRequest(`reservations/${id}`, {
    headers: getHeaders(token),
    method: 'PUT',
    body: { status: 'rejected' },
  });

export const seeLoad = (token, start, end, teamId) =>
  makeRequest(
    `reservations/seeload?start_date=${start}&end_date=${end}&team_id=${teamId}`,
    {
      headers: getHeaders(token),
    }
  );

export const postReservation = (token, body) => {
  makeRequest('reservations', {
    headers: getHeaders(token),
    method: 'POST',
    body,
  });
};
export const deleteReservation = (token, resId) =>
  makeRequest(`reservations/${resId}`, {
    headers: getHeaders(token),
    method: 'DELETE',
  });
