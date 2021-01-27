export const teamTokenSelector = (state) => ({
  token: state.signin.token,
  teams: state.teams.teams,
  pendingReservations: state.reservations.pendingReservations,
  tables: state.tables.tablesList,
});
