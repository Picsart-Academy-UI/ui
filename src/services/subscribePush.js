import { MAIN_URL } from '../constants';

export default function subscribe(subscription, token) {
  return fetch(`${MAIN_URL}notifications/subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}
