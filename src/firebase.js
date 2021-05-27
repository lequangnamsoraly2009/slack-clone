import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAwjcMhHTpSHcE624Qo07rV9pZNqc4eGaM",
    authDomain: "slack-clone-63da2.firebaseapp.com",
    projectId: "slack-clone-63da2",
    storageBucket: "slack-clone-63da2.appspot.com",
    messagingSenderId: "553056488342",
    appId: "1:553056488342:web:d1274d08f3e9983d362bb7"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();