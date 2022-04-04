import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyARA3_MYiOnQca26ajlJNctpUs6fNVhARc",
  authDomain: "netflix-10a7f.firebaseapp.com",
  projectId: "netflix-10a7f",
  storageBucket: "netflix-10a7f.appspot.com",
  messagingSenderId: "158962757661",
  appId: "1:158962757661:web:38d4f11549c6f333c056f4"
};

const firebase = Firebase.initializeApp(config);

// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };