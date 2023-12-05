import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Importe a função getStorage do pacote firebase/storage

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDjON1uMP6wcZicCp5cz8ykbCMmYGi4TmM",
  authDomain: "chatsocial-d3911.firebaseapp.com",
  projectId: "chatsocial-d3911",
  storageBucket: "chatsocial-d3911.appspot.com",
  messagingSenderId: "352714894467",
  appId: "1:352714894467:web:a4b8a0e73e7d6e5acb7fb6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app); // Importe e exporte o objeto storage
export const stone = getFirestore(app); // Importe do firestone
