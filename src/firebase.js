import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, signOut, OAuthProvider, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATQSzKkrWXjhZNIfQkJEYFCMsd27sG8GQ",
  authDomain: "mental-game-c4040.firebaseapp.com",
  projectId: "mental-game-c4040",
  storageBucket: "mental-game-c4040.firebasestorage.app",
  messagingSenderId: "766921863094",
  appId: "1:766921863094:web:f087d6efa286fd6b425b17",
  measurementId: "G-GQDY41MF1K"
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
