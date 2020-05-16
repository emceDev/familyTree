import React, { Component } from 'react';
import {signInPopup,logOut} from '../db/FirebaseAuth'
import {getFromLocalStorage} from '../localStorage/user'
import {Button} from '@material-ui/core'
class Login extends Component{
render(){
    return(
        <div>
        {!!getFromLocalStorage()
        ?
        <Button 
        onClick={()=>{
        logOut(()=>{
            this.props.history.push("/")
        })
        }}>
          logout
        </Button>
        :
        <Button 
        onClick={()=>{
            signInPopup(() => {
                this.props.history.push("/UserLogged");
              })   
        }}>
          log/sign
        </Button>
        }
        </div>
    )
}
}
export default Login