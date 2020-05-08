import React from 'react';
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import UserLogged from './pages/UserLogged';
import FamMgmt from './components/FamMgmt'
function App() {
  return (
    <div className="App">
      <Router>
        <div style={{position:"sticky",top:"0",zIndex:"2"}}>
        <Navigation />
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/UserLogged" exact component={UserLogged} />
          <Route path="/FamMgmt" exact component={FamMgmt} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
