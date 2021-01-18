import {
  getPOSTRequestObject,
  getPUTRequestObject,
  getGETRequestObject,
  getGETOneRequestObject,
  getDELETERequestObject,
} from '../utils';

export const getTableCreateRequestData = ({ token, body, route }) =>
  getPOSTRequestObject({ token, body, route });

export const getTablesAllRequestData = ({ token, route }) =>
  getGETRequestObject({ token, route });

export const getTableIdRequestData = ({ token, id, route }) =>
  getGETOneRequestObject({ token, id, route });

export const getTableUpdateRequestData = ({ token, id, body, route }) =>
  getPUTRequestObject({ token, id, body, route });

export const getTableDeleteRequestData = ({ token, id, route }) =>
  getDELETERequestObject({ token, id, route });
