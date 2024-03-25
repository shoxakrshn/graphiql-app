import { initializeApp } from 'firebase/app';
import { User, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const getUserInfo = async (email: string) => {
  const user: User | null = auth.currentUser;

  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    const expirationTime = idTokenResult.expirationTime;

    return {
      isUser: true,
      email: email,
      expirationTimeToken: expirationTime,
    };
  }

  return null;
};
