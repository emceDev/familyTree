import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

function Navigation(props) {
	return (
		<div>
			<AppBar position="static">
				<Toolbar color="secondary">
					<Typography variant="h7">
						<Button variant="outlined">
							<Link to="/" id="Home">
								Home
							</Link>
						</Button>
						<Button variant="outlined">
							<Link to="FamList" id="FamList">
								FamilyTree
							</Link>
						</Button>
						<Button variant="outlined">
							<Link to="FamAdmin" id="FamAdmin">
								FamilyAdmin
							</Link>
						</Button>
					</Typography>
					<Login history={props.history} />
				</Toolbar>
			</AppBar>
		</div>
	);
}
export default Navigation;
