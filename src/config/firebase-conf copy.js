import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

  // Your web app's Firebase configuration 
  const firebaseConfig = {
    apiKey: "AIzaSyC57rRaZ3skhwMLiN1Gub-af8-GKVQlOdU",
    authDomain: "test-gn-68deb.firebaseapp.com",
    databaseURL: "https://test-gn-68deb-default-rtdb.firebaseio.com",
    projectId: "test-gn-68deb",
    storageBucket: "test-gn-68deb.appspot.com",
    messagingSenderId: "632559734395",
    appId: "1:632559734395:web:078d615f99e31b333d9cde"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  
    // Initialize Firebase Authentication and get a reference to the service
    export const auth = getAuth(app);