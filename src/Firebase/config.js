// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import 'firebase/storage'
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCL_cNcY5M85eCV_upc-tJvexPwKiVIs2s",
  authDomain: "my-ecomart-2c906.firebaseapp.com",
  projectId: "my-ecomart-2c906",
  storageBucket: "my-ecomart-2c906.appspot.com",
  messagingSenderId: "355324646923",
  appId: "1:355324646923:web:7df9539b901aefd0b4190e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage();
const db = getFirestore(app);
export {storage, db};