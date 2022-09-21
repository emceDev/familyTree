import React from "react";
import Member from "./Member";
import AddMember from "./AddMember";
import { app } from "../db/Config";
import Navigation from "../components/Navigation";
import { FamiliesList } from "../components/FamiliesList";
import { checkPermissions } from "../db/Queries2";

class FamList extends React.Component {
	constructor() {
		super();
		this.state = {
			membersList: null,
			vw: "",
			vh: "",
			previewMode: true,
			famKey: "",
			typeOfUser: undefined,
		};
		this.setDefault = this.setDefault.bind(this);
	}
	componentDidMount() {
		// console.log("fam list MOunted")
		this.setState({ vw: window.innerWidth, vh: window.innerHeight });
		// console.log("famkisr"+famKey)
		if (this.state.famKey !== "") {
			this.checkIfEmpty(this.state.famKey);
		} else {
		}
	}
	setDefault(x) {
		console.log(x);
		this.setState({ famKey: x });
		this.checkIfEmpty(x);
		checkPermissions(x, (z) => {
			this.setState({ typeOfUser: z });
		});
	}
	//members array settings
	checkIfEmpty(famKey) {
		const members = app.database().ref("/families/" + famKey + "/memKeys/");

		members.on("value", (snap) => {
			var membersArray = [];
			console.log(snap.val());
			if (snap.val() === null) {
				this.setState({ membersList: null });
			} else {
				snap.val().map((member) => {
					membersArray.push(member);
				});
				this.setState({ membersList: membersArray });
			}
		});
	}

	render() {
		return (
			<div className="FamList">
				<Navigation />
				<div className="FamListContainer">
					<h1>Family tree</h1>

					<FamiliesList setDefault={this.setDefault} className="FamiliesList" />
				</div>

				{this.state.typeOfUser === undefined ? (
					console.log("undefined type of user", this.state)
				) : this.state.membersList === null ? (
					<AddMember famKey={this.state.famKey} />
				) : (
					<Member
						key={this.state.membersList[this.state.membersList.length - 1]}
						memKey={this.state.membersList[this.state.membersList.length - 1]}
						famKey={this.state.famKey}
						typeOfUser={this.state.typeOfUser}
					/>
				)}
			</div>
		);
	}
}

export default FamList;
