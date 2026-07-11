import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjyTuvk0BHtxl2GO2_AOV5D5NuyjrVIys",
  authDomain: "cartel-cypher.firebaseapp.com",
  projectId: "cartel-cypher",
  storageBucket: "cartel-cypher.firebasestorage.app",
  messagingSenderId: "418621481873",
  appId: "1:418621481873:web:7a8e9aad9f3f493fe2f030",
  measurementId: "G-BKFSN8M2RR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
