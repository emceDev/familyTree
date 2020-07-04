import React, { useState, useEffect } from 'react'
import {Image} from 'cloudinary-react'
import axios from 'axios'
import defaultAvatar from '../images/default.jpeg'

export const Avatar = (props) =>{
    const [data, setData] = useState()
    const [load,setLoad] = useState(false)
    useEffect(() => {
        axios.get('http://res.cloudinary.com/m4t1ce/image/upload/v1/'+props.url)
            .then(res => {
                setData(res)
                setLoad(true);
            })
            .catch(err => {
                console.log("XD"+err.message)
            })
    }, []);

    if (load===true){
        return(
            // <img src=" " alt="xd"></img>
            <Image 
            cloudName="m4t1ce" 
            publicId={props.url}
            >
            </Image>
        )}
    else{
        return(
            // <img src={defaultAvatar} alt="x"></img>
            <img src={defaultAvatar} alt="dd"></img>
        )
        }
    }
