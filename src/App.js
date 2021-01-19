import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import UserLogged from "./pages/UserLogged";
import FamList from "./components/FamList";
import { FamAdmin } from "./pages/FamAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Home} />
				<ProtectedRoute exact path="/UserLogged" component={UserLogged} />
				<ProtectedRoute exact path="/FamAdmin" component={FamAdmin} />
				<ProtectedRoute exact path="/FamList" component={FamList} />
				<Route path="*" component={() => <p>404 not found</p>} />
			</Switch>
		</div>
	);
}

export default App;
