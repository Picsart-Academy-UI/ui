import {
  getPOSTRequestObject,
  getPUTRequestObject,
  getGETRequestObject,
  getGETOneRequestObject,
  getDELETERequestObject,
} from '../utils';

export const getTeamCreateRequestData = ({ token, body, route }) =>
  getPOSTRequestObject({ token, body, route });

export const getTeamUpdateRequestData = ({ token, id, body, route }) =>
  getPUTRequestObject({ token, id, body, route });

export const getTeamsAllRequestData = ({ token, route }) =>
  getGETRequestObject({ token, route });

export const getTeambyIDRequestData = ({ token, id, route }) =>
  getGETOneRequestObject({ token, id, route });

export const getTeamDeleteRequestData = ({ token, id, route }) =>
  getDELETERequestObject({ token, id, route });
