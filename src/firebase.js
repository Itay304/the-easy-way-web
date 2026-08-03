import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'my-book-club-site',
  appId: '1:464855561341:web:5fd0bde37e4aa6c86aad14',
  storageBucket: 'my-book-club-site.firebasestorage.app',
  apiKey: 'AIzaSyDLPgU1i0YmBm7YjJm6v7Y9Z-6TNL-_M8w',
  authDomain: 'my-book-club-site.firebaseapp.com',
  messagingSenderId: '464855561341',
  measurementId: 'G-V1960SJQLT',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
