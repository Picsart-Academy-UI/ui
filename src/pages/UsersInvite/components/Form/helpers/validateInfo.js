import { EMAIL_REGEXP, GMAIL_REGEXP } from '../../../../../constants';

const validateInfo = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email address required';
  } else if (
    !EMAIL_REGEXP.test(values.email) ||
    !GMAIL_REGEXP.test(values.email)
  ) {
    errors.email = 'invalid email address';
  }

  if (!values.first_name.trim()) {
    errors.first_name = 'Name required';
  }

  if (!values.last_name.trim()) {
    errors.last_name = 'Surname required';
  }

  if (values.birthdate) {
    const nowYear = new Date().getFullYear();
    const birthYear = Number(values.birthdate.split('-')[0]);
    const isOlder100 = nowYear - birthYear > 100;
    const isFromFuture = new Date(values.birthdate) > new Date();
    if (isFromFuture || isOlder100) {
      errors.birthdate = 'Invalid date';
    }
  }

  if (!values.team_id) {
    errors.team_id = 'Team required';
  }

  if (!values.position_id.trim()) {
    errors.position_id = 'Position required';
  }

  // if (!values.phone.trim()) {
  //   errors.phone = 'Invalid phone number';
  // }

  return errors;
};

export default validateInfo;
