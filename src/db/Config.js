import firebase from 'firebase'
export const firebaseConfig = {
    apiKey: "AIzaSyA0FaS800RTtpHhRKMVrlDZ7jlqng8S2Zo",
    authDomain: "apitests-d25a6.firebaseapp.com",
    databaseURL: "https://apitests-d25a6.firebaseio.com",
    projectId: "apitests-d25a6",
    storageBucket: "apitests-d25a6.appspot.com",
    messagingSenderId: "703056296501",
    appId: "1:703056296501:web:a4ff0e98cd4b5dd9848f7c"
  };
export const app = firebase.initializeApp(firebaseConfig)
