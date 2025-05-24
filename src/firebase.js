// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCwCUXBdXXUWsNJ8cDIdKxK2hmIi88OLvU",
    authDomain: "table-22fe2.firebaseapp.com",
    projectId: "table-22fe2",
    storageBucket: "table-22fe2.firebasestorage.app",
    messagingSenderId: "890656391947",
    appId: "1:890656391947:web:3c5ddb113bf8eb2189d80e",
    measurementId: "G-MWVL8ZRLKX"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// Получаем доступ к Firestore
const db = getFirestore(app);

export { db };
