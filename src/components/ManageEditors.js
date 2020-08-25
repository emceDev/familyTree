import React from 'react'
import { AddEditors } from '../components/AddEditors'
import { ListEditors } from '../components/ListEditors'
 
export const ManageEditors = props => {
    return(
        <div>
            ManageEditors
            <AddEditors famkey={props.famkey}/>
            <ListEditors famkey={props.famkey}/>
        </div>
    )
}