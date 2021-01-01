const getUserInvitationRequestData = ({ token, body }) => ({
  url: 'http://localhost:6789/api/v1/auth/invite',
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
