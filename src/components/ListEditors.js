import React, { useState, useEffect } from "react";
import { updateList, getEmail, setPermissions } from "../db/Queries2";
// name can get into confusion FUUUUUSSEEEEE! electricaly evolevoleved rewolwerolwiec
export const ListEditors = (props) => {
	const [editorsList, setEditorsList] = useState([]);
	const [viewersList, setViewersList] = useState([]);
	const [update, setUpdate] = useState([false]);
	function cb(x, e) {
		// getEmail(e).then((response) => {
		// 	setEditorsList((editorsList) => [...editorsList, response.val().email]);
		// });
		if (x === null) {
			console.log("no editors nor viewers");
		} else {
			if (x === "editor") {
				setEditorsList([]);
				getEmail(e).then((response) => {
					setEditorsList((editorsList) => [...editorsList, response.val()]);
				});
			} else {
				getEmail(e).then((response) => {
					setViewersList((viewersList) => [...viewersList, response.val()]);
				});
			}
		}
	}
	function handlePromotion(e, placeInDb) {
		setPermissions(e.target.getAttribute("id"), props.famkey, placeInDb);
	}

	useEffect(() => {
		updateList(cb, props.famkey);
	}, []);

	return (
		<div>
			{viewersList.length === 0 ? (
				<p>vierws</p>
			) : (
				viewersList.map((x) => {
					return (
						<p
							style={{ color: "green" }}
							onClick={(e) => {
								handlePromotion(e, "visitors");
							}}
							key={x.uid}
							id={x.uid}
						>
							{x.email}
						</p>
					);
				})
			)}
			{editorsList.length === 0 ? (
				<p>editors</p>
			) : (
				editorsList.map((x) => {
					return (
						<p
							style={{ color: "pink" }}
							onClick={(e) => {
								handlePromotion(e, "editors");
							}}
							key={x.uid}
							id={x.uid}
						>
							{x.email}
						</p>
					);
				})
			)}
		</div>
	);
};
