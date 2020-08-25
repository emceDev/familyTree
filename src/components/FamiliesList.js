import React, { useState, useEffect } from 'react'
import {GetFamName} from '../db/Queries2'

export const List = props => {
    return (
            <p famkey={props.famKey}>{props.famName}</p>
    )
}

export const FamiliesList = props => {

    const [famNames, setfamNames] = useState([])
    const [famKeys, setfamKeys] = useState([])
    const [display, setDisplay] = useState(false)
    var index = 0;
    var FamKeysPlace = JSON.parse(localStorage.getItem('user')).famKey


    useEffect(()=>{
        if(FamKeysPlace.length === famKeys.length){
            console.log("no data to update" , FamKeysPlace.length === famKeys.length)
        }else{
            setfamKeys([])
            setfamNames([])
            console.log(famKeys,"    ",famNames)
            console.log("setting keys" + FamKeysPlace)
            FamKeysPlace.map(x=>{
                setfamKeys(famKeys=>[...famKeys, x])
            })
        }
    },[display])

    useEffect(()=>{
        // console.log("famkeys changed"+famKeys)
        famKeys.length !== FamKeysPlace.length || famKeys.length === 0
        ?console.log(" famKeys.length !== FamKeysPlace.length"+ famKeys.length === FamKeysPlace.length)
        :famKeys.map(x => GetFamName(x).then(
            response=>{setfamNames(famNames=>[...famNames, response.val()])}
        ))
    },[famKeys])
    

return (
    <div className="FamiliesList">
        <h3 onClick={()=>{setDisplay(!display)}}>Families</h3>
        <div className="listContent" style={{display:display?'block':'none'}} onClick={e=>{props.setDefault(e.target.getAttribute('famkey'))}} onMouseLeave={()=>{setDisplay(false)}}>
        {
            famNames.length === 0
            ?<p>no families found</p>
            :famNames.map(x=>{
                return(
                        <List famName = {x} famKey = {famKeys[index]} key={famKeys[index]} d={index++}/>
                )
            })
        }
        </div>
    </div>
)
}