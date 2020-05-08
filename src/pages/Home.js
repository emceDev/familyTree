import React from 'react';
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react';
import '../styles/home.css';

function Home() {
  return (
    <div className="Home" >
        <h1>Homepage</h1>
        <Image cloudName="m4t1ce" publicId="FirstFolder/eqooaezvyalikyw8gess.jpg" >
        </Image>

    </div>
  );}
  export default Home

