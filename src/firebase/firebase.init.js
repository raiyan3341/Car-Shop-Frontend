import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoG_deig75bnDA7Td_dwu3-FQeOVbTsBc",
  authDomain: "assignment-10-bb401.firebaseapp.com",
  projectId: "assignment-10-bb401",
  storageBucket: "assignment-10-bb401.firebasestorage.app",
  messagingSenderId: "95767657693",
  appId: "1:95767657693:web:6ca6048163d16bd3d6af34"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

 