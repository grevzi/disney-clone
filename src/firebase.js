import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBk-coZPK1jOQLvxYKm7xsGv5pBlVmWywc",
    authDomain: "disneyplus-clone-6ff05.firebaseapp.com",
    projectId: "disneyplus-clone-6ff05",
    storageBucket: "disneyplus-clone-6ff05.appspot.com",
    messagingSenderId: "1010759844418",
    appId: "1:1010759844418:web:da2a7bbda8da21a09463db"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()

export {auth, provider, storage}
export default db