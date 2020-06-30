import React from 'react'
import {Image} from 'cloudinary-react'
import defaultAvatar from 'https://res.cloudinary.com/m4t1ce/image/upload/c_scale,h_150,w_130/v1589569855/default_ts45ax.jpg'
export const Avatar = (props) =>{
    return(
        <Image 
        cloudName="m4t1ce" 
        publicId={props.url}
        onError={
            e=>{e.target.src=defaultAvatar}}
        >
        </Image>
    )
}