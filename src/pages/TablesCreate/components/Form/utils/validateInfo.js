const validateInfo = (values) => {
  const errors = {};

  if (!values.table_number) {
    errors.table_number = 'Table number required';
  }
  if (!values.chairs_count) {
    errors.chairs_count = 'Chairs count required';
  }
  if (!values.team_id) {
    errors.team_id = 'Team required';
  }

  return errors;
};

export default validateInfo;
