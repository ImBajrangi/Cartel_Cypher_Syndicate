import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4YIIGBQL2uT3CoHbTdmd0N8fJAz_ZhYA",
  authDomain: "cartelcypher-demo.firebaseapp.com",
  projectId: "cartelcypher-demo",
  storageBucket: "cartelcypher-demo.firebasestorage.app",
  messagingSenderId: "573784135804",
  appId: "1:573784135804:web:84c25dd6c79ddbff8fd1f9",
  measurementId: "G-RSCMBTZXGB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
