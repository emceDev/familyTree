import React from 'react';
import Navigation from './components/Navigation'
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import UserLogged from './pages/UserLogged';
import FamMgmt from './components/FamMgmt'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute
        exact path="/UserLogged"
        component={UserLogged}
        />
        <ProtectedRoute
        exact path="/FamMgmt"
        component={FamMgmt}
        />
        <Route  path="*" component={()=><p>404 not found</p>} />
      </Switch>
    </div>
  );
}

export default App;
