import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD4p2p8rTDtjZh5Ce33lWvoMdXnWRFquLw",
    authDomain: "e-shop-db-57e2d.firebaseapp.com",
    databaseURL: "https://e-shop-db-57e2d.firebaseio.com",
    projectId: "e-shop-db-57e2d",
    storageBucket: "e-shop-db-57e2d.appspot.com",
    messagingSenderId: "1052843708993",
    appId: "1:1052843708993:web:90ebdb1a649538f409acc0",
    measurementId: "G-L5HPFPSN0G"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) {
    return ;
  } 
  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(err) {
      console.log(err.message);
    }
  }
  return userRef;
  // console.log(snapShot);
} 

export const convertCollectionsSnapshotToMap = (collections) => {
 const transformedCollection = collections.docs.map((doc) => {
   const {title,items} = doc.data();
   return {
     routeName: encodeURI(title.toLowerCase()),
     id: doc.id,
     title,
     items
   }
 })
 return transformedCollection.reduce((acc,collection) => {
   acc[collection.title.toLowerCase()] = collection;
   return acc;
 },{});
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);
  });
  return await batch.commit();
}

firebase.initializeApp(config);

export const auth  = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;