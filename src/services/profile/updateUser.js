import { MAIN_URL } from '../../constants';

const updateUser = (token, id, body) =>
  new Request(`${MAIN_URL}users/${id}`, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });

export default updateUser;
