
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBcfhXGt-CnecHEkfiQsuS8v8CuWrmk0pg",
  authDomain: "instagram-2-21e82.firebaseapp.com",
  projectId: "instagram-2-21e82",
  storageBucket: "instagram-2-21e82.appspot.com",
  messagingSenderId: "119562925183",
  appId: "1:119562925183:web:632a49965cc28ad06d7b4a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export  {
    storage, firebase as default
  }
 
 