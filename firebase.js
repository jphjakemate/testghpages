// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";

//importo el objeto collections
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  getDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD07L808cwXUtxn77gs0jya5ogZ6dE7vY",
  authDomain: "crud-fb-a724e.firebaseapp.com",
  projectId: "crud-fb-a724e",
  storageBucket: "crud-fb-a724e.appspot.com",
  messagingSenderId: "632599842856",
  appId: "1:632599842856:web:b13cf308f285fdb08da51d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// creo la conexion a la BD
const db = getFirestore();

// creo una funcion savetask y agrego export para que otros archivos puedan importar la funcion y usarla
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title: title, description: description });

export const getTasks = () => getDocs(collection(db, "tasks"));

//suscribo para recibir la coleccion (querySnapshot) al modificarse en firestore
export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

/*  comentado porque en vez de exportar este objeto exportare onGetTasks
export  { 
    onSnapshot,
    collection,
    db
     } // exporto el objeto snapshot junto con lo coleccion y la conexion para poder usarla en index.js
*/
