// Below we have used 'firebase/compat/app' (basically used 'compat') for firebase compatibility with its older version v8 & similarly for others as well
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq7ydXZq9zelriJLdx_6MwO91cWYF-AxA",
  authDomain: "clone-1d0ef.firebaseapp.com",
  projectId: "clone-1d0ef",
  storageBucket: "clone-1d0ef.appspot.com",
  messagingSenderId: "544068875217",
  appId: "1:544068875217:web:d5af3683b28f412d6a26f0",
  measurementId: "G-5KL5093JEZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };