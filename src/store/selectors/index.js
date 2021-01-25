// eslint-disable-next-line
export const teamTokenSelector = (state) => ({
  token: state.signin.token,
  teams: state.teams.teams,
});
