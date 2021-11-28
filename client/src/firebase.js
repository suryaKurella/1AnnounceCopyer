import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();


const firebaseConfig = {
    apiKey: "AIzaSyDU4t0s5qIwIhOnguM_o8uBVgm475kV4cA",
    authDomain: "auth-development-2e7b3.firebaseapp.com",
    projectId: "auth-development-2e7b3",
    storageBucket: "auth-development-2e7b3.appspot.com",
    messagingSenderId: "693490690247",
    appId: "1:693490690247:web:7713f62be6fe0633f176e2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth()
export default app
