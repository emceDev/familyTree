import React, { useState, useEffect } from "react";
import { GetFamName } from "../db/Queries2";
import {
	ListItem,
	ListItemIcon,
	Checkbox,
	ListItemText,
} from "@material-ui/core";
{
	/* <div famkey={props.famKey}>{props.famName}</div> */
}
export const Listitem = (props) => {
	return (
		<ListItem
			famkey={props.famKey}
			key={props.famKey}
			onClick={() => {
				props.cb(props.famKey);
				props.setTitle(props.famName);
			}}
			role={undefined}
			dense
			button
		>
			<ListItemText primary={props.famName} />
		</ListItem>
	);
};

export const FamiliesList = (props) => {
	const [famNames, setfamNames] = useState([]);
	const [famKeys, setfamKeys] = useState([]);
	const [display, setDisplay] = useState(false);
	const [title, setTitle] = useState("Families");
	var index = 0;
	var FamKeysPlace = JSON.parse(localStorage.user).famKey;

	useEffect(() => {
		if (FamKeysPlace === null) {
			console.log("no families detected");
		} else if (FamKeysPlace.length === famKeys.length) {
			console.log("no data to update", FamKeysPlace.length, famKeys.length);
		} else {
			setfamKeys([]);
			setfamNames([]);
			console.log("setting keys" + FamKeysPlace);
			FamKeysPlace.map((x) => {
				setfamKeys((famKeys) => [...famKeys, x]);
			});
		}
	}, [display]);

	useEffect(() => {
		console.log("FamiliesList -> famKeys", famKeys);
		console.log("FamiliesList -> famNames", famNames);
		if (famKeys === null) {
			console.log("famkeys = null");
		} else if (famKeys.length === famNames.length) {
			console.log("nothing to update");
		} else {
			famKeys.map((x) =>
				GetFamName(x).then((response) => {
					setfamNames((famNames) => [...famNames, response.val()]);
				})
			);
		}
	}, [famKeys]);

	return (
		<div className="FamiliesList">
			<h3
				onClick={() => {
					setDisplay(!display);
				}}
			>
				{title}
			</h3>
			<div
				className="listContent"
				style={{ display: display ? "block" : "none" }}
				onClick={(e) => {
					console.log("save default");
					// props.setDefault(e.target.getAttribute("famkey"));
					// console.log(e.target.getAttribute("famkey"));
				}}
				onMouseLeave={() => {
					setDisplay(false);
				}}
			>
				{famNames.length === 0 ? (
					<div>no families found</div>
				) : (
					famNames.map((x) => {
						return (
							<Listitem
								famName={x}
								famKey={famKeys[index]}
								key={famKeys[index]}
								d={index++}
								cb={(x) => {
									props.setDefault(x);
								}}
								setTitle={(x) => {
									setTitle(x);
								}}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};
