import React, { useState, useEffect } from 'react'
import {createFamily, deleteFamily} from '../db/Queries2'
import Navigation from '../components/Navigation'
import { FamiliesList } from '../components/FamiliesList'
import { ManageEditors } from '../components/ManageEditors'

export const DeleteSection = props =>{
    const [password, setPassword] = useState(null)
    return(
        <div>
            <input 
            type="password" 
            placeholder="insert family password here" 
            onChange={(e)=>(setPassword(e.target.value))}/>

            <button onClick={()=>deleteFamily(password, props.famkey)}>Delete</button>
        </div>
    )
}
export const CreateSection = () => {
    const [familyName, setFamilyName] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    useEffect(()=>{
        document.getElementsByTagName('input')[0].value = ""
        document.getElementsByTagName('input')[1].value = ""
    },[status])

    return(
    <div>
        <label style={{color:familyName.length>2?'green':'red'}}>
            Type family Name here 
        <input type="text"onChange={(e)=>{setFamilyName(e.target.value)}}/>
        </label>

        <label style={{color:password.length>5?'green':'red'}}>
            Type password here 
        <input type="password"onChange={(e)=>{setPassword(e.target.value)}}/>
        </label>
        <button onClick={()=>{
            return(
            password.length>5 && familyName.length>2
            ?createFamily(familyName, password,(x)=>{setStatus(x)})
            :null)
        }
            }>Create</button>
    </div>)
}


export const Buttons = props => {
    return(
        <div>
                <button 
                onClick={()=>{props.setDeleteDisplay(true)}}>
                    delete family
                </button>
                <button 
                onClick={()=>{props.setManageEditorsDisplay(true)}}>
                    manage editors
                </button>
            </div>
    )
}
export const FamAdmin = () =>{
    const [manageEditorsDisplay, setManageEditorsDisplay] = useState(true)
    const [deleteDisplay, setDeleteDisplay] = useState(false)
    const [createDisplay, setCreateDisplay] = useState(false)
    const [famkey, setfamkey] = useState(undefined)

    useEffect(()=>{
        return(
            deleteDisplay === true
            ?setCreateDisplay(false)
            :undefined
        )
    },[deleteDisplay])
    useEffect(()=>{
        return(
            createDisplay===true
            ?setDeleteDisplay(false)
            :undefined
        )
    },[createDisplay])
    return(
        <div className="FamAdminContainer">
            <Navigation/>

            {/* <FamNames/> */}
            <div className="FamAdmin">

            <div>
            <FamiliesList setDefault={(x)=>setfamkey(x)}/>
            </div>
            
            <div>
            {deleteDisplay
            ?famkey !== undefined 
            ?<DeleteSection famkey={famkey}/>
            :<p>choose family from list or createFamily</p>
            :<Buttons 
            setDeleteDisplay={(x)=>{setDeleteDisplay(x)}} 
            setManageEditorsDisplay={(x)=>{setManageEditorsDisplay(x)}}/>
            }

            {createDisplay
            ?<CreateSection/>
            :<button onClick={()=>{setCreateDisplay(true)}}>Create Family</button>
            }

            {famkey === undefined || manageEditorsDisplay === false
            ?null
            :<ManageEditors famkey={famkey}/>
            }

            </div>
            </div>
            </div>
    )
}