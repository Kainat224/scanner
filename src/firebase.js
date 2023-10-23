// import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const initFirebase = () => {
//   try {
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         apiKey: 'AIzaSyB52XNpLDaLk-bsxIcxkG7-2WKMkcwdZDc',
//         authDomain: 'cv-test-8dd3c.firebaseapp.com',
//         projectId: 'cv-test-8dd3c',
//         storageBucket: 'cv-test-8dd3c.appspot.com',
//         messagingSenderId: '550221364771',
//         appId: '1:550221364771:web:fbc7ed45f7e1bb25f93b96',
//       });
//     } else {
//       firebase.app();
//     }
//   } catch (error) {
//     console.log('Firebase notifications disabled');
//   }
// };

// export default initFirebase;

// const firebaseConfig = {
//   apiKey: 'AIzaSyB52XNpLDaLk-bsxIcxkG7-2WKMkcwdZDc',
//   authDomain: 'cv-test-8dd3c.firebaseapp.com',
//   projectId: 'cv-test-8dd3c',
//   storageBucket: 'cv-test-8dd3c.appspot.com',
//   messagingSenderId: '550221364771',
//   appId: '1:550221364771:web:fbc7ed45f7e1bb25f93b96',
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
