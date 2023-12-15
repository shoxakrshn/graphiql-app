import { initializeApp } from 'firebase/app';
import { User, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDzr0HMReo_LXKhkQJAeqy6n8k81xOzlos',
  authDomain: 'rs-graphiql-85bdf.firebaseapp.com',
  projectId: 'rs-graphiql-85bdf',
  storageBucket: 'rs-graphiql-85bdf.appspot.com',
  messagingSenderId: '195941205669',
  appId: '1:195941205669:web:674d84946eb67d96ee2f4c',
  measurementId: 'G-08N8VC2S8T',
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
