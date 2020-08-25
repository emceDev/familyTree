import React from 'react';
import { Image } from 'cloudinary-react';
import '../styles/home.css';
import Navigation from '../components/Navigation';
import {Link, Router} from 'react-router-dom'

function Home(props) {
  return (
    <div className="Home" >
      <Navigation history={props.history} />
      <h1>Tree.com lets internet help you review roots of your family</h1> 
      <h2>I want to :</h2>
      <p>See som family</p>
      <Link to="FamList" id="FamList">Go to 
      </Link>
      <p>Create my own family tree</p>
      <Link to="FamAdmin" id="FamAdmin">Create family
      </Link>
    </div>
  );}
  export default Home

