import React, { Fragment, useState, useEffect } from "react";
import { handleLinkAdd } from "../db/Queries2";
import { TextField, Button } from "@material-ui/core";

export const LinkToFamily = () => {
	const [password, setPassword] = useState("");
	const [link, setLink] = useState("");
	const [display, setDisplay] = useState(false);
	const [error, setError] = useState("use your link here");
	function cb(err, x) {
		setDisplay(!err);
		setError(x);
		document.getElementById("error").innerText = error;
	}
	function handleSubmit() {
		password.length < 6 || link.length < 10
			? setError("invalid link or password")
			: handleLinkAdd(cb, link, password);
	}
	return (
		<div className="LinkToFamily" className="LinkToFamily">
			{display === false ? (
				<Button
					color="primary"
					variant="outlined"
					size="large"
					onClick={() => {
						setDisplay(!display);
					}}
				>
					Link
				</Button>
			) : (
				<div
					style={{
						display: display ? "flex" : "none",
						position: display ? "absolute" : "block",
						flexDirection: "column",
					}}
				>
					<p
						id="error"
						onClick={() => {
							setDisplay(!display);
						}}
					>
						{error}
					</p>
					<TextField
						color="secondary"
						id="standard-basic"
						label="paste your link here"
						onChange={(e) => {
							setLink(e.target.value);
						}}
					/>
					<TextField
						id="standard-basic"
						color="secondary"
						label="type family password here"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button
						color="secondary"
						variant="contained"
						onClick={() => {
							handleSubmit();
						}}
					>
						Submit
					</Button>
				</div>
			)}
		</div>
	);
};
