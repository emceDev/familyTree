import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { getFromLocalStorage } from '../localStorage/user'

// checks if localstorage.isloggedIn is true
class ProtectedRoute extends React.Component {
    render() {
      return (
        <Route
          render={props => {
            return (
              <div>
                {!!getFromLocalStorage() && getFromLocalStorage().isLoggedIn===true
                ? <this.props.component />
                :<Redirect
                to={{
                    pathname: "/",
                    state: {
                      from: props.location
                    }
                  }}
                />
                }
              </div>
            );
          }}
        />
      );
    }
  }
  export default ProtectedRoute;
  