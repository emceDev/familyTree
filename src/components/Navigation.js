import React, { useState } from 'react';
import {Link, Router} from 'react-router-dom'
import Login from './Login';
import {getFromLocalStorage} from '../localStorage/user'
import {AppBar,Toolbar,Typography,Button} from '@material-ui/core'
  function Navigation(props){
    return(
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Button variant="outlined">
              <Link to="/" id="Home">Home
              </Link>
            </Button>
          </Typography>
          {!!getFromLocalStorage()
          ?<Button variant="outlined"><Link to="FamMgmt" id="FamMgmt">Manage Your family tree here</Link></Button>
          :null
          }
          <Login history={props.history}/>
        </Toolbar>
      </AppBar>
        

      </div>
    )
  }
export default Navigation;