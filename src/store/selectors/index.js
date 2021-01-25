export const teamTokenSelector = (state) => ({
  token: state.signin.token,
  teams: state.teams.teams,
});
