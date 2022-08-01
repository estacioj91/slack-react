import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider ,signInWithPopup,  updateProfile } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCq7ZamW3jC-V18DVJHVDheRbXjKC5636A",
    authDomain: "slack-917b8.firebaseapp.com",
    projectId: "slack-917b8",
    storageBucket: "slack-917b8.appspot.com",
    messagingSenderId: "770491367485",
    appId: "1:770491367485:web:208ee153599849b34cea54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, updateProfile, signInWithPopup};
