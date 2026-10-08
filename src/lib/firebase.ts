/**
 * @license
 * Firebase initialization for Al Masreya Real Estate.
 * Uses exact project parameters from firebase-applet-config.json.
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass databaseId from configuration
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Authentication service
export const auth = getAuth(app);

// Startup connection verification test as mandated by Firebase Skill
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Please check your network and configuration.');
    }
  }
}

testConnection();
