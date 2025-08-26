
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8d6cN6GLMAjIZWV4q9HWyDsevvYzns8M",
  authDomain: "lab-management-system-c3664.firebaseapp.com",
  projectId: "lab-management-system-c3664",
  storageBucket: "lab-management-system-c3664.firebasestorage.app",
  messagingSenderId: "333375273638",
  appId: "1:333375273638:web:f0eddeb4c9fd533a9a1267"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
