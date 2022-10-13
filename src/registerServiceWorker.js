/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n'
        + 'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered(registration) {
      console.log('Service worker has been registered.');
      setInterval(() => {
        registration.update();
      }, 60 * 1000); // every 60 seconds
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');
      // If the frontend does not run before us it will not be able
      // to recieve the update event. we need to tell it somehow.
      window.$_serviceWorkerUpdate = registration;
      document.dispatchEvent(
        new CustomEvent('serviceWorkerUpdateEvent', { detail: registration })
      );
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
