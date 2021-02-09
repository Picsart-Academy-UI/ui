import { EMAIL_REGEXP, GMAIL_REGEXP, PICSART_MAIL_REGEXP } from '../constants';

const validateInfo = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email address required';
  } else if (
    !EMAIL_REGEXP.test(values.email) &&
    (!GMAIL_REGEXP.test(values.email) ||
      !PICSART_MAIL_REGEXP.test(values.email))
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.first_name.trim()) {
    errors.first_name = 'Name required';
  }

  if (!values.last_name.trim()) {
    errors.last_name = 'Surname required';
  }

  if (values.birthday) {
    const nowYear = new Date().getFullYear();
    const birthYear = Number(values.birthday.split('-')[0]);
    const isOlder100 = nowYear - birthYear > 100;
    const isFromFuture = new Date(values.birthday) > new Date();
    if (isFromFuture || isOlder100) {
      errors.birthday = 'Invalid date';
    }
  }

  if (!values.team_id) {
    errors.team_id = 'Team required';
  }

  if (!values.position.trim()) {
    errors.position = 'Position required';
  }

  if (
    values.phone.value &&
    values.phone.phoneNumber?.country !== values.phone.country
  ) {
    errors.phone = 'Invalid phone number';
  }

  return errors;
};

export default validateInfo;
