import React, { useState } from 'react';
import {Link, Router} from 'react-router-dom'

  function Navigation(){
    return(
      <div>
        <Link to="/" id="Home">Home</Link>
        <Link to="/UserLogged" id="UserLogged">UserLogged</Link>
      </div>
    )
  }
export default Navigation;