import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Importe a função getStorage do pacote firebase/storage

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDL_JbnvxBtLaKcd2VQbn9LyTiUOTP_Lvk",
  authDomain: "movie4pps.firebaseapp.com",
  databaseURL: "https://movie4pps-default-rtdb.firebaseio.com",
  projectId: "movie4pps",
  storageBucket: "movie4pps.appspot.com",
  messagingSenderId: "253150873253",
  appId: "1:253150873253:web:df2319f5bb28d16426ef4c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app); // Importe e exporte o objeto storage
export const stone = getFirestore(app); // Importe do firestone
