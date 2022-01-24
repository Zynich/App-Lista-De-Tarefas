import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBrLmeICyaHn6NHmPWTdl5Q38fM3diGuBc",
    authDomain: "todolistapp-51072.firebaseapp.com",
    projectId: "todolistapp-51072",
    storageBucket: "todolistapp-51072.appspot.com",
    messagingSenderId: "259121025527",
    appId: "1:259121025527:web:e23ae2b2a0ce520fac5ef2",
    measurementId: "G-TZ4HKFF3WC"
  };
  
  // Initialize Firebase
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);

    }


  export default firebase;