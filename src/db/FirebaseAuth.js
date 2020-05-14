import firebase from 'firebase'
import {firebaseConfig} from '../db/Config'
import React from 'react'
import { addUserToDb } from './Queries2'
import {app} from '../db/Config'

var provider = new firebase.auth.GoogleAuthProvider();

export const signInPopup = () => {
firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // addUserToDb(user)
    addUserToDb(user.uid,user.displayName,user.photoURL,user.email)
    return user
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  })
}
export const logOut = () =>{
    firebase.auth().signOut().then(function() {
        console.log("loggedOut")
      }).catch(function(error) {
        // An error happened.
      });
}