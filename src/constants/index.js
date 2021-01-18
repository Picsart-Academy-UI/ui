export const CHAIR = `${process.env.PUBLIC_URL}/images/chair.png`;
export const PICSART_LOGO = `${process.env.PUBLIC_URL}/images/picsart.jpg`;
export const GOOGLE_LOGO = `${process.env.PUBLIC_URL}/images/google.png`;
export const MAIN_URL = 'https://api.officeorg.ninja/api/v1/';
// export const MAIN_URL = 'http://localhost:6789/api/v1/';
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
export const GMAIL_REGEXP = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;
export const PICSART_MAIL_REGEXP = /^[a-z0-9](\.?[a-z0-9]){5,}@picsart\.com$/i;
export const API_URL_PART = {
  authSignIn: 'auth/signin',
  authIvite: 'auth/invite',
  users: 'users',
  teams: 'teams',
  tables: 'tables',
  chairs: 'chairs',
  reservations: 'reservaions',
};
