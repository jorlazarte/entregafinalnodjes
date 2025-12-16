// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFh-MLt0qbnUGKPcEmL5n8tFWNOxVvxcQ",
  authDomain: "apirest-nodejs.firebaseapp.com",
  projectId: "apirest-nodejs",
  storageBucket: "apirest-nodejs.firebasestorage.app",
  messagingSenderId: "579855301223",
  appId: "1:579855301223:web:59b46ff07b627bc71f32c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}