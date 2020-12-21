export const setPath = (path) => {
  const pathArr = path.split('/');
  if (!pathArr.join('')) return '/reservations';
  if (pathArr.includes('reservations')) return '/reservations';
  if (pathArr.includes('teams')) return '/teams';
  if (pathArr.includes('users')) return '/users';
  return false;
};
