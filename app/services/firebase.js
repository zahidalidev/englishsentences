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

const categoryRef = Firestore.collection("category");
const productRef = Firestore.collection("product");
const variantRef = Firestore.collection("variant");

export const addCategory = async (body) => await categoryRef.add(body);

export const updateCategory = async (body) => {
  const snapshot = await categoryRef.where("id", "==", body.id).get();
  if (snapshot.empty) {
    return new Error(message);
  }

  let res = {};
  snapshot.forEach((doc) => {
    res = doc.data();
    res.id = doc.id;
  });

  return await categoryRef.doc(res.id).update({ name: body.name });
};

export const getAllCategory = async () => {
  let categories = [];
  const snapshot = await categoryRef.get();
  snapshot.docs.map((doc, index) => {
    let temp = doc.data();
    let tempObj = {};
    tempObj.name = temp.name;
    tempObj.id = doc.id;
    categories.push(tempObj);
  });

  return categories;
};
