import firebase from 'firebase'
import {firebaseConfig} from '../db/Config'
import React from 'react'
const app = firebase.initializeApp(firebaseConfig)

export const getNewKey = (object) => {
    return app.database().ref().child(object).push().key
}
function setFamilyMemberIds(familyId,key){

    var familyMemberIds = [key,]
// keys downloading
    var getFamilyMembersId = app.database().ref('/families/' + familyId + '/membersId')
    getFamilyMembersId.once('value', snap => {
        var x = snap.val()
            x.map(z=>{familyMemberIds.push(z)})
        })
    return familyMemberIds
}
export const postData = (data) => {
    const key = getNewKey(data.type)

    app.database().ref( data.type + key ).update(data)

    if( data.type === 'members/' ){
        var familyId = data.familyId
        var newMemberIds = setFamilyMemberIds(familyId, key)
        
        setTimeout(() => {
            app.database().ref('/families/' + familyId).update({'membersId':newMemberIds})
        }, 1000);
    }
    return key
}
export const getFamilyMembers = (familyId) => {
    console.log(familyId)
    const members = app.database().ref('/families/'+familyId+'/membersId/')
    var membersArray=[]
    members.on('value',snap => {
        membersArray.push(snap.val())
        var x = Object.values(snap.val())
        x.map(member => {membersArray.push(member)})
    })
    return membersArray
}
export const displayPerson = (key)=>{
    const members = app.database().ref('members/' + key)
    members.once('value',snap => {
        var member = snap.val()
        // var x = Object.values(snap.val())
        // x.map(z=>{member.push(z)})
    })
}