import { publicVapidKey } from '../constants';
import store from '../store';
import {
  addCurrentPushSubscription,
  addPushSubscription,
} from '../store/slices/signinSlice'; // eslint-disable-line
import urlBase64ToUint8Array from './urlBase64ToUint8Array';
import subscribe from './subscribePush';

async function subscribeForPushNotification(registration, publicVapidKey) {
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
}

async function register(token, user) {
  let subscription;
  const reg = await navigator.serviceWorker.register('/sw.js', {
    scope: '/',
  });

  let serviceWorker;
  if (reg.installing) {
    serviceWorker = reg.installing;
  } else if (reg.waiting) {
    serviceWorker = reg.waiting;
  } else if (reg.active) {
    serviceWorker = reg.active;
  }

  if (serviceWorker) {
    if (serviceWorker.state === 'activated') {
      const existingPushSubscription = await reg.pushManager.getSubscription();
      if (
        !user.push_subscriptions.some(
          (sub) => sub.endpoint === existingPushSubscription.endpoint
        )
      ) {
        subscription = await subscribeForPushNotification(reg, publicVapidKey);
        const res = await subscribe(subscription, token);
        if (res.ok) {
          const sub = await res.json();
          store.dispatch(addCurrentPushSubscription(JSON.parse(sub)));
          store.dispatch(addPushSubscription(JSON.parse(sub)));
        }
      }
    }
    serviceWorker.addEventListener('statechange', async (e) => {
      if (e.target.state === 'activated') {
        subscription = await subscribeForPushNotification(reg, publicVapidKey);
        const res = await subscribe(subscription, token);
        if (res.ok) {
          const sub = await res.json();
          store.dispatch(addCurrentPushSubscription(JSON.parse(sub)));
          store.dispatch(addPushSubscription(JSON.parse(sub)));
        }
      }
    });
  }
}

function registerSw(token, user) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    register(token, user).catch((err) => console.log(err));
  }
}

export default registerSw;
