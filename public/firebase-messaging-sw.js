// Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyBx67EiV0d6pmWyqdZchb8qJC_cUNC58kU',
  authDomain: 'shankha-1528029142621.firebaseapp.com',
  projectId: 'shankha-1528029142621',
  storageBucket: 'shankha-1528029142621.appspot.com',
  messagingSenderId: '413588803788',
  appId: '1:413588803788:web:d92c82445d1a01b820f269',
  measurementId: 'G-XKWTMG395N',
};

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background content ', JSON.parse(payload.notification.body));
  const notificationTitle = 'hello';
  const notificationOptions = {
    body: 'world',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
