import React, { useState } from 'react';
import {Link, Router} from 'react-router-dom'
import {signInPopup,logOut} from '../db/FirebaseAuth'

  function Navigation(){
    return(
      <div>
        <Link to="/" id="Home">Home</Link>
        <Link to="/FamMgmt" id="FamMgmt">/FamMgmt</Link>
        <button onClick={()=>{signInPopup()}}>
          log/sign
        </button>
        <button onClick={()=>{logOut()}}>
          logout
        </button>
      </div>
    )
  }
export default Navigation;