import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Importe a função getStorage do pacote firebase/storage



const firebaseConfig = {
  apiKey: "AIzaSyBFq0phFJTkxkjmd8hDUsN7uZjYusGuDKM",
  authDomain: "blogapp-46659.firebaseapp.com",
  databaseURL: "https://blogapp-46659-default-rtdb.firebaseio.com",
  projectId: "blogapp-46659",
  storageBucket: "blogapp-46659.appspot.com",
  messagingSenderId: "642406589422",
  appId: "1:642406589422:web:323ed22fda4bbfff5ae4ff",
  measurementId: "G-4PHRC6JRB5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app); // Importe e exporte o objeto storage
