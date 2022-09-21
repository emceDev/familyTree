import React, { useState, useEffect } from "react";
import { createFamily, deleteFamily } from "../db/Queries2";
import { Button, ButtonGroup, Input, TextField } from "@material-ui/core";
import Navigation from "../components/Navigation";
import { FamiliesList } from "../components/FamiliesList";
import { ManageEditors } from "../components/ManageEditors";
import { LinkToFamily } from "../components/LinkToFamily";
export const DeleteSection = (props) => {
	const [password, setPassword] = useState(null);
	return (
		<div>
			<Input
				type="password"
				placeholder="insert family password here"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button onClick={() => deleteFamily(password, props.famkey)}>
				Delete
			</Button>
		</div>
	);
};
export const CreateSection = () => {
	const [familyName, setFamilyName] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState("");

	useEffect(() => {
		document.getElementsByTagName("Input")[0].value = "";
		document.getElementsByTagName("Input")[1].value = "";
	}, [status]);

	return (
		<div>
			<TextField
				error={familyName.length < 1 ? true : false}
				label={"Type family name here"}
				type="text"
				onChange={(e) => {
					setFamilyName(e.target.value);
				}}
			/>

			<TextField
				error={password.length < 6 ? true : false}
				type="password"
				label="Type family password here"
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<Button
				color="primary"
				variant="outlined"
				size="medium"
				onClick={() => {
					return password.length > 5 && familyName.length > 2
						? createFamily(familyName, password, (x) => {
								setStatus(x);
						  })
						: null;
				}}
			>
				Create
			</Button>
		</div>
	);
};

export const Buttons = (props) => {
	return (
		// <div style={{ display: "flex", flexDirection: "row" }}>
		<ButtonGroup variant="contained" color="primary" orientation="horizontal">
			<Button
				onClick={() => {
					props.setDisplay("1");
				}}
			>
				delete family
			</Button>
			<Button
				onClick={() => {
					props.setDisplay("2");
				}}
			>
				manage editors
			</Button>
			<Button
				onClick={() => {
					props.setDisplay("3");
				}}
			>
				Create Family
			</Button>
		</ButtonGroup>
		// </div>
	);
};
export const FamAdmin = () => {
	const [display, setDisplay] = useState(null);
	const [famkey, setfamkey] = useState(undefined);
	return (
		<div className="FamAdminContainer">
			<Navigation />
			{/* {console.log(Button)} */}

			{/* <FamNames/> */}
			<div className="FamAdmin">
				<div style={{ display: "flex", flexDirection: "row" }}>
					<FamiliesList setDefault={(x) => setfamkey(x)} />
					<Buttons
						setDisplay={(x) => {
							setDisplay(x);
						}}
					/>
					<LinkToFamily />
				</div>
				<div>
					{display === "1" && famkey !== undefined ? (
						<DeleteSection famkey={famkey} />
					) : null}
					{display === "2" && famkey !== undefined ? (
						<ManageEditors famkey={famkey} />
					) : null}
					{display === "3" ? <CreateSection /> : null}

					{/* {famkey === undefined || manageEditorsDisplay === false ? null : (
						
					// )} */}
				</div>
			</div>
		</div>
	);
};
