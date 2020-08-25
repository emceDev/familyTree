import React, {useState } from "react";
import { handleLinkAdd } from "../db/Queries2";

export const LinkToFamily = () => {
    const [password, setPassword] = useState('')
    const [link, setLink] = useState('');

    function cb(x){
        console.log("cb")
        console.log(x)
    }
    function handleSubmit(){
        password.length < 6
        ?handleLinkAdd(cb,link)
        :handleLinkAdd(cb,link, password)
    }
    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <label>paste your link here
                <input type='text' onChange={e=>{setLink(e.target.value)}}></input>
            </label>
            <label>type password here
                <input type='text' onChange={e=>{setPassword(e.target.value)}}></input>
            </label>
            <button onClick={()=>{handleSubmit()}}>Submit</button>
        </div>
    )
}