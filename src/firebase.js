import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, signOut, OAuthProvider, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Discord OAuth Provider
const discordProvider = new OAuthProvider('oidc.discord');
// Request additional scopes to get user profile information
discordProvider.addScope('identify');
discordProvider.addScope('email');

// Sign in with Discord
export const signInWithDiscord = async () => {
  try {
    const result = await signInWithPopup(auth, discordProvider);

    // Get the OAuth credential
    const credential = OAuthProvider.credentialFromResult(result);

    // Log the full result to see what we get
    console.log('Sign-in result:', result);
    console.log('Credential:', credential);
    console.log('Additional user info:', result._tokenResponse);

    return result;
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};

// Sign out
export const signOutUser = () => {
  return signOut(auth);
};

export { db, auth, onAuthStateChanged };
