import firebase from 'firebase'
import React from 'react'
import {app} from './Config'


// Adding Relative
export const getKey = (type) => app.database().ref(type).push().key

export const familyMemberKeys = (memKey,famKey) => {

    const famKeys = app.database().ref('/families/'+ famKey + '/memKeys/')
    var famKeysArray=[memKey,]

    famKeys.once('value', snap => 
    {
      if( !!snap.val() ){
        snap.val().map( key => {
        famKeysArray.push(key)
      })
      }
      else{
        return null
      }
    famKeys.set(famKeysArray)
      })
      
}

export const addToMembers = (memKey,data)=>{
    setTimeout(() => {
        app.database().ref('members/' + memKey + '/').update(data)
    }, 2000);
}
export const addMemberToDb = (relKey,memKey,type,) => {
    const relKeys = app.database().ref('/members/'+ relKey + type)
    var relKeysArray = []

    relKeys.once('value', snap => {
            if( snap.val() === null || !!snap.val === false ){
              relKeysArray.push(memKey)
            }
            else{
              var x = snap.val()
              x.map(z => {
                relKeysArray.push(z)
              })
              relKeysArray.push(memKey)
            }

            var objectArray = Object.values(relKeysArray)
            relKeys.set(objectArray)
          })
}
// MemberComponent
export const listenMemberData = memKey => {
    return app.database().ref('/members/' + memKey)
}
// adding user
export const addUserToDb = (uid,displayName,photoURL,email) => {
  const userData = {
    uid:uid,
    name:displayName,
    photo:photoURL,
    email:email,
    isLoggedIn:true,
  }
  app.database().ref('Users/' + uid + '/').update(userData)

}