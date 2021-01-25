// eslint-disable-next-line
export const setPath = (path) => {
  const pathArr = path.split('/');
  if (!pathArr.join('')) return '/reservations';
  if (pathArr.includes('reservations')) return '/reservations';
  if (pathArr.includes('teams')) return '/teams';
  if (pathArr.includes('users')) return '/users';
  if (pathArr.includes('requests')) return '/requests';
  return false;
};
