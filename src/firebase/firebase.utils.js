import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCSYESIFpc-FgcPkNU6DL_LcwgDoqxTH4Q",
    authDomain: "crwn-db-f8b64.firebaseapp.com",
    databaseURL: "https://crwn-db-f8b64.firebaseio.com",
    projectId: "crwn-db-f8b64",
    storageBucket: "crwn-db-f8b64.appspot.com",
    messagingSenderId: "650808450516",
    appId: "1:650808450516:web:2348fd9a0037fb991c0a41",
    measurementId: "G-BKGMXYBLQX"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;