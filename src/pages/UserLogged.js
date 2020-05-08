import React from 'react'
import {Link, Router} from 'react-router-dom'
import FamMgmt from '../components/FamMgmt'
class UserLogged extends React.Component {
    render() {
      return (
      <div>
          <h1>Hello you are logged IN :)</h1>
            <Link to="/FamMgmt" id="FamMgmt">Click to add family</Link>
      </div>)
    }
}

  export default UserLogged

