import {
  getPOSTRequestObject,
  getPUTRequestObject,
  getGETRequestObject,
  getGETOneRequestObject,
  getDELETERequestObject,
} from '../utils';

export const getReservationCreateRequestData = ({ token, body, route }) =>
  getPOSTRequestObject({ token, body, route });

export const getReservationsAllRequestData = ({ token, route }) =>
  getGETRequestObject({ token, route });

export const getReservationIdRequestData = ({ token, id, route }) =>
  getGETOneRequestObject({ token, id, route });

export const getReservationUpdateRequestData = ({ token, id, body, route }) =>
  getPUTRequestObject({ token, id, body, route });

export const getReservationDeleteRequestData = ({ token, id, route }) =>
  getDELETERequestObject({ token, id, route });
