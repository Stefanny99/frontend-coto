import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3N-Tf77sRXSG0vRW2DkbfySZTb9baBFY",
  authDomain: "proyecto-final-85a5e.firebaseapp.com",
  projectId: "proyecto-final-85a5e",
  storageBucket: "proyecto-final-85a5e.appspot.com",
  messagingSenderId: "317563996117",
  appId: "1:317563996117:web:d67680adcbaabfc61a1f5c",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
