import React from 'react';
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react';
import '../styles/home.css';
import Navigation from '../components/Navigation'

function Home() {
  return (
    <div className="Home" >
      
      <Navigation />
      <h1>Tree.com lets internet help you review roots of your family</h1>
      <Image 
      cloudName="m4t1ce" 
      publicId="FirstFolder/eqooaezvyalikyw8gess.jpg"
      >
      </Image>

    </div>
  );}
  export default Home

