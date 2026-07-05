import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCl4xmpHpdMY7Scy1Bc8V2NXlCZx7o-Muc",
  authDomain: "csc-print-system.firebaseapp.com",
  projectId: "csc-print-system",
  storageBucket: "csc-print-system.firebasestorage.app",
  messagingSenderId: "239931283622",
  appId: "1:239931283622:web:9382870846f81c3f227c67"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
