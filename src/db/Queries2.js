import firebase from 'firebase'
import React, { Children } from 'react'
import {app} from './Config'
import { addToLocalStorage,logOut} from '../localStorage/user'
import imageLoader from '../components/ImageLoader'


// Creating family

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
export const createFamily = (uid,famKey) =>{
  // app.database().ref('/families/').push(famKey)
}
// adding user and deciding if he exists then login him
export const addUserToDb = (uid,displayName,photoURL,email) => {

  const userData = {
    uid:uid,
    name:displayName,
    photo:photoURL,
    email:email,
    isLoggedIn:true,
    famKey:null
  }
  const userLocationInDb = app.database().ref('users/' + uid + '/')
  const user = app.database().ref(('users/' + uid))

  user.once('value', snap => {
    if( snap.val() === null ){
      userData.famKey = app.database().ref('users/').push().key
      userLocationInDb.update(userData)
      addToLocalStorage(userData)
    }
    else{
      const getFamKey = app.database().ref('users/' + uid + '/famKey')
      getFamKey.once('value',snap=>{
        userData.famKey=snap.val()
        addToLocalStorage(userData)
      })
      app.database().ref('users/' + uid + '/').update({isLoggedIn:true})
    }
})
}
export const setLogOut = () =>{
    const uid = JSON.parse(window.localStorage.getItem('user')).uid
    app.database().ref('users/' + uid + '/').update({isLoggedIn:false})
    logOut()
}

export const listenUserData = uid => {
  return app.database().ref('users/' + uid)
}
// editingMember
export const editMember = data => {
  const memData = listenMemberData(data.memKey)
  memData.update({
    name:data.name,
    description:data.description,
    residence:data.residence
  })
}
export const deleteMember = (memKey,famKey) => {

    var parentKey = null
    const getParentKey = app.database().ref('/members/'+memKey+"/parent/")
    getParentKey.once('value', snap =>{
      if(snap.val!==null){
        parentKey=snap.val()
      }})

    //operation on parent object in database
    const childrenInDb = app.database().ref("/members/" + parentKey + "/children/")
    const children = []

    childrenInDb.once('value', snap => 
    {  
      if(snap.val()!==null){
        snap.val().map(key => {
          if(key !== memKey){
            children.push(key)
          }
          else{
            return null
          }
        })
        childrenInDb.set(children)
      }
    })

    // operation on family/memKeys/
    const childInFamkeys = app.database().ref("/families/" + famKey + "/memKeys/")
    const childInFamKeysArray = []
    childInFamkeys.once('value', snap => 
    {  
      if(snap.val() !== null){
        snap.val().map(key => {
          if(key !== memKey){
            childInFamKeysArray.push(key)
          }
          else{
            return null
          }
        })
        childInFamkeys.set(childInFamKeysArray)
      }
    })

    // delete in partner
    var partnerKey = null
    const getPartnerKey = app.database().ref('/members/' + memKey + "/partner/")

    getPartnerKey.once('value', snap =>{
      if( snap.val !== null ){
        partnerKey=snap.val()
      }})
    
    const partnerInDb = app.database().ref("/members/" + partnerKey + "/partner/")
    partnerInDb.set([])

    // delete its children
    const memberChildren = app.database().ref("/members/" + memKey + "/children/")
    memberChildren.once('value', snap => 
    {  
      if(snap.val() !== null){
        snap.val().map(key => {
          if(key !== memKey){
            app.database().ref('/members/').child(key).remove()
          }
          else{
            return null
          }
        })
      }
    })

    // delete member in members
    listenMemberData(memKey).remove()

}
