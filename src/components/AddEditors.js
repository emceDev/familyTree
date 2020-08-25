import React, { useState } from 'react'




// if user deleted from viewers 
    // delete famkey in users[what if user not relogged]

// components
    // Fam admin > manage editors > Link, list
    // FamList > ...FamList, addFamily

    // addFamily > textbox => adding user as viewer > displaying in manage editors,
    // adding famkey in localStorage

// generate link 

// get link (famkey)
    // type it into textbox
    // got uid

// display viewers email in list(of moderator)
    // set his type viewer or editor(email,viewer,delete him)

export const AddEditors = props => {

    const [password, setPassword] = useState('')

    function handleGeneration(){
        var key = props.key
        if(!key){
            console.log("no family key found. Propably you dont have family created")
            console.log(key)
        }else{
            var link = key
            var element = document.createElement('textarea')
            document.body.appendChild(element)
            element.value = link
            element.select()
            document.execCommand("copy")
            document.body.removeChild(element)
            alert('copied!')
        }
    }

    return(
        <div>
            <p>Via activation link</p>
            <button 
            onClick={()=>{
                handleGeneration()
            }}>Generate Link</button>
            <p>Add via email address</p>
            <input onChange={(e)=> setPassword(e.target.value)}></input>
            <p>{password}</p>
        </div>
    )
}