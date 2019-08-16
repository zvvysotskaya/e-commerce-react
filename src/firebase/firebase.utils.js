import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDUr4yo9rQTdBnt-ey-S61vRuPkn69uRWg",
    authDomain: "e-commerce-react2.firebaseapp.com",
    databaseURL: "https://e-commerce-react2.firebaseio.com",
    projectId: "e-commerce-react2",
    storageBucket: "",
    messagingSenderId: "280007278479",
    appId: "1:280007278479:web:0d3473da756ab1b7"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//for google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;