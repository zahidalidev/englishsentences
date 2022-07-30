import "expo-firestore-offline-persistence";

import firebase from "firebase/app";
import "firebase/firestore";

import { firebaseConfig } from "../config/db";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Firestore = firebase.firestore();
// Firestore.enablePersistence()
//   .then((data) => console.log("Offline successfully enable: ", data))
//   .catch((error) => console.log("Offline error: ", error));
// Firestore.disableNetwork();
// enableIndexedDbPersistence;
// Subsequent queries will use persistence, if it was enabled successfully

const categoryRef = Firestore.collection("category");
const productRef = Firestore.collection("product");
const variantRef = Firestore.collection("variant");

export const addCategory = async (body) => await categoryRef.add(body);

export const updateCategory = async (name, id) =>
  await categoryRef.doc(id).update({ name });

export const removeCategory = async (id) => await categoryRef.doc(id).delete();

export const getAllCategory = async () => {
  const snapshot = await categoryRef.get();
  let categories = [];
  snapshot.docs.map(async (doc, index) => {
    let temp = doc.data();
    let tempObj = {};
    tempObj.name = temp.name;
    tempObj.id = doc.id;
    tempObj.items = 1;

    categories.push(tempObj);
  });

  return categories;
};

export const addProduct = async (body) => await productRef.add(body);

export const updateProduct = async (body, id) =>
  await productRef.doc(id).update(body);

export const removeProduct = async (id) => await productRef.doc(id).delete();

export const getProductByCategory = async (id) => {
  const snapshot2 = await productRef.where("catId", "==", id).get();
  let products = [];
  snapshot2.docs.map(async (doc, index) => {
    products.push(doc.data());
  });

  return products;
};
