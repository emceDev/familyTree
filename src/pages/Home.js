import React from 'react';
import { Image } from 'cloudinary-react';
// import tree from '../images/tree.jpg'
import '../styles/home.css';
import Login from '../components/Login'
import Navigation from '../components/Navigation';

function Home(props) {
  return (
    <div className="Home" >
      <Navigation history={props.history} />
      <h1>Tree.com lets internet help you review roots of your family</h1>
      {/* sets local storage */}
    </div>
  );}
  export default Home

