import {
  getPOSTRequestObject,
  getPUTRequestObject,
  getGETRequestObject,
  getGETOneRequestObject,
  getDELETERequestObject,
} from '../utils';

export const getChairCreateRequestData = ({ token, body, route }) =>
  getPOSTRequestObject({ token, body, route });

export const getChairsAllRequestData = ({ token, route }) =>
  getGETRequestObject({ token, route });

export const getChairIdRequestData = ({ token, id, route }) =>
  getGETOneRequestObject({ token, id, route });

export const getChairUpdateRequestData = ({ token, id, body, route }) =>
  getPUTRequestObject({ token, id, body, route });

export const getChairDeleteRequestData = ({ token, id, route }) =>
  getDELETERequestObject({ token, id, route });
