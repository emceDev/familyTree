import firebase from 'firebase'
import {firebaseConfig} from '../db/Config'
import React from 'react'
import { addUserToDb, setLogOut } from './Queries2'
var provider = new firebase.auth.GoogleAuthProvider();

export const signInPopup = (cb) => {
firebase.auth().signInWithPopup(provider).then(function(result) {
    var user = result.user;
    addUserToDb(user.uid, user.displayName, user.photoURL, user.email)
    console.log("succes")
    cb()
  }).catch(function(error) {
    console.log(error)
    // ...
  })
}
export const logOut = (cb) =>{
    firebase.auth().signOut().then(function() {
        setLogOut()
        cb()
      }).catch(function(error) {
        // An error happened.
      });
}