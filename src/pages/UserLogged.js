import React from 'react'
import {Link, Route,Switch} from 'react-router-dom'
import FamMgmt from '../components/FamMgmt'
import ProtectedRoute from '../components/ProtectedRoute'
import Navigation from '../components/Navigation'
import {getFromLocalStorage} from '../localStorage/user'
class UserLogged extends React.Component {
    render() {
      return (
      <div>
          <div>
            <Navigation UserLogged={true}/>
          </div>
          <h1>Hello {getFromLocalStorage().name}</h1>
      </div>)
    }
}

  export default UserLogged

