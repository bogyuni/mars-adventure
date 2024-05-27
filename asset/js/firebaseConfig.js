import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiWv_D_NQwOpHi-q9HQqCzccH83XQAiek",
  authDomain: "mars-adventure.firebaseapp.com",
  projectId: "mars-adventure",
  storageBucket: "mars-adventure.appspot.com",
  messagingSenderId: "205826904229",
  appId: "1:205826904229:web:f0f5587f92db643d027d4c",
  measurementId: "G-R9KDK0NJXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// chat-write
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
