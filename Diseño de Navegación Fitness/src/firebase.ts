import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdfyeQCUiKfvpTni7SZJ8YV6dSlRSKlsI",
  authDomain: "fitpro-91148.firebaseapp.com",
  projectId: "fitpro-91148",
  storageBucket: "fitpro-91148.firebasestorage.app",
  messagingSenderId: "1059398214876",
  appId: "1:1059398214876:web:dc3df1f3db9ce8c9760019",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
