import { MAIN_ROUTE } from '../../constants';

const getUserInvitationRequestData = ({ token, body }) => ({
  url: `${MAIN_ROUTE}auth/invite`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body,
  },
});

export default getUserInvitationRequestData;
