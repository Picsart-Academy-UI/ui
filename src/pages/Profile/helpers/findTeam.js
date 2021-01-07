const findTeam = (teams) => {
  console.log(teams);
  let id;
  Array.from(teams).forEach((el) => {
    if (el.selected) id = el.id;
  });
  return id;
};

export default findTeam;
