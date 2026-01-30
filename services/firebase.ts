
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUjIApneLADO9ZW_d3PvTgJbLr0n9tXls",
    authDomain: "trustmarket-57013.firebaseapp.com",
    projectId: "trustmarket-57013",
    storageBucket: "trustmarket-57013.firebasestorage.app",
    messagingSenderId: "80930282571",
    appId: "1:80930282571:web:ec8d7183250044d2b541ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
