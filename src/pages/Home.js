import React from 'react';
import { Image } from 'cloudinary-react';
import '../styles/home.css';
import Login from '../components/Login'
import Navigation from '../components/Navigation';

function Home(props) {
  return (
    <div className="Home" >
      <Navigation history={props.history} />
      <h1>Tree.com lets internet help you review roots of your family</h1>
      <Image 
      cloudName="m4t1ce" 
      publicId="FirstFolder/eqooaezvyalikyw8gess.jpg"
      >
      </Image>
      {/* sets local storage */}
    </div>
  );}
  export default Home

