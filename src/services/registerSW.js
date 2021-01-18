import { publicVapidKey } from '../constants';
import store from '../store';
import { addPushSubscription } from '../store/slices/signinSlice';
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
      console.log('sw already activated - Do whatever needed here');
      // subscription = await subscribeForPushNotification(reg, publicVapidKey);

      const existingPushSubscription = await reg.pushManager.getSubscription();
      reg.pushManager.getSubscription().then((pushSubscription) => {
        console.log(pushSubscription, 'existing push subscription');
      });
      if (
        !user.push_subscriptions.some(
          (sub) => sub.endpoint === existingPushSubscription.endpoint
        )
      ) {
        subscription = await subscribeForPushNotification(reg, publicVapidKey);
        console.log('STEX PETQ A CHMTNI EL');
        const res = await subscribe(subscription, token);
        const sub = await res.json();
        console.log(11111111111, sub);
        // if(sub === 'Subscribtion with given endpoint already exists') {
        //   return
        // }
        store.dispatch(addPushSubscription(JSON.parse(sub)));
      }
    }
    serviceWorker.addEventListener('statechange', async (e) => {
      if (e.target.state === 'activated') {
        console.log(
          'Just now activated. now we can subscribe for push notification'
        );
        subscription = await subscribeForPushNotification(reg, publicVapidKey);
        if (
          !user.push_subscriptions.some(
            (sub) => sub.endpoint === subscription.endpoint
          )
        ) {
          const res = await subscribe(subscription, token);
          const sub = await res.json();
          console.log(2222222222, JSON.parse(sub));
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
