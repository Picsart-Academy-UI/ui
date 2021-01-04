import { MAIN_ROUTE } from '../../constants';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmViNzQzZWFjNWI2NzM0N2M1MTY1MjUiLCJlbWFpbCI6InJvbWFuLmJhbGF5YW5AcGljc2FydC5jb20iLCJ0ZWFtX2lkIjoiNWZlYjczMTAzMzliMGQzM2QxOGI3Mjg1IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTYwOTI2NjM3Mn0.Om3K-0j4OhlF3wZD7AJFEqVONQ35LW6BhotFNZPtImQ';

const getAllTeams = () => ({
  url: `${MAIN_ROUTE}/teams`,
  options: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  },
});

export default getAllTeams;
