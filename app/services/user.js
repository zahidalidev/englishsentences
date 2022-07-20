import "expo-firestore-offline-persistence";

import firebase from "firebase/app";
import "firebase/firestore";

import { firebaseConfig } from "../config/db";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Firestore = firebase.firestore();
Firestore.enablePersistence()
  .then((data) => console.log("Offline successfully enable: ", data))
  .catch((error) => console.log("Offline error: ", error));

// Firestore.disableNetwork();
// enableIndexedDbPersistence;
// Subsequent queries will use persistence, if it was enabled successfully

const userRef = Firestore.collection("user");

export const addUser = async (body) => {
  return await userRef.add(body);
};

export const getAllUsers = async () => {
  let users = [];
  const snapshot = await userRef.get();
  snapshot.docs.map((doc, index) => {
    let temp = doc.data();
    let tempObj = {};
    tempObj.name = temp.name;
    tempObj.contactNumber = temp.contactNumber;
    tempObj.email = temp.email;
    tempObj.id = index;
    users.push(tempObj);
  });

  return users;
};
