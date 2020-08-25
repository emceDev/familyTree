import React, {useState, useEffect} from 'react'
import { updateList, getEmail } from '../db/Queries2'
// name can get into confusion FUUUUUSSEEEEE! electricaly evolevoleved rewolwerolwiec
export const ListEditors = props => {
    const [editorsList, setEditorsList] = useState([])
    const [viewersList, setViewersList] = useState([])

    function cb(x,e){
        // getEmail(e).then(
        //     response=>{setEditorsList(editorsList=>[...editorsList, response.val().email])}
        // )
        x === 'editor'
        ?getEmail(e).then(
            response=>{setEditorsList(editorsList=>[...editorsList, response.val().email])}
        )
        :getEmail(e).then(
            response=>{setViewersList(viewersList=>[...viewersList, response.val().email])}
        )
    }
    function handlePromotion(e){
        
    }
    useEffect(()=>{
        updateList(cb,props.famkey)
    },[])

    return(
        <div>
        {
            viewersList.length === 0
            ?<p>vierws</p>
            :viewersList.map(x=>{return <p style={{color:'green'}} onClick={(e)=>{handlePromotion(e.target.value)}}>{x}</p>})
        }
        {
            editorsList.length === 0
            ?<p>editors</p>
            :editorsList.map(x=>{return <p style={{color:'pink'}}>{x}</p>})
        }
        </div>
    )
}