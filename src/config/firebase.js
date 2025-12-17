import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

import dotenv from 'dotenv';
dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY, //"AIzaSyCFh-MLt0qbnUGKPcEmL5n8tFWNOxVvxcQ",
  authDomain: process.env.FIREBASE_AUTHDOMAIN, //"apirest-nodejs.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECTID, //"apirest-nodejs",
  storageBucket: process.env.FIREBASE_STORAGEBUCKET, //"apirest-nodejs.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENERDID, //"579855301223",
  appId: process.env.FIREBASE_APPID //"1:579855301223:web:59b46ff07b627bc71f32c2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}