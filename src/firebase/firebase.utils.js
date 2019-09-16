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
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumalator, collection) => {
        accumalator[collection.title.toLowerCase()] = collection;
        return accumalator;
    }, {}
    );
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    //if object exists we query db
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating an user", error.massage);
        }
    }
    return userRef;

} 
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//for google authentication


export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;