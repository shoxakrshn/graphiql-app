import { initializeApp } from 'firebase/app';
import { User, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
