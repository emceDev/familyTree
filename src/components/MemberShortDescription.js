import React from 'react'
export const MemberShortDescription = props =>{
    return(
        <div className="memberShortDescription">
            <p>{props.name}</p>
            <p>{props.description}</p>
            <p>{props.residence}</p>
        </div>
    )
}