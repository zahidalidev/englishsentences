import "expo-firestore-offline-persistence";

import firebase from "firebase/app";
import "firebase/firestore";

import { firebaseConfig } from "../config/db";

firebase.initializeApp(firebaseConfig);

const Firestore = firebase.firestore();

const settings = {
  timestampsInSnapshots: true,
};

Firestore.settings(settings);

Firestore.enablePersistence()
  .then((data) => {
    console.log("Offline successfully enable: ", data);
  })
  .catch((error) => console.log("Offline error: ", error));

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
  const snapshot = await productRef.where("catId", "==", id).get();
  let products = [];
  snapshot.docs.map(async (doc, index) => {
    const tempObj = doc.data();
    tempObj.id = doc.id;
    products.push(tempObj);
  });

  return products;
};

export const addVariant = async (body) => await variantRef.add(body);

export const updateVariant = async (body, id) =>
  await variantRef.doc(id).update(body);

export const removeVariant = async (id) => await variantRef.doc(id).delete();

export const getVariantByProduct = async (id) => {
  const snapshot = await variantRef.where("prodId", "==", id).get();
  let Variants = [];
  snapshot.docs.map(async (doc, index) => {
    const tempObj = doc.data();
    tempObj.id = doc.id;
    Variants.push(tempObj);
  });

  return Variants;
};
