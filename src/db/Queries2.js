import { app } from "./Config";
import {
	addToLocalStorage,
	getFromLocalStorage,
	logOut,
} from "../localStorage/user";

var uid = undefined;
if (JSON.parse(localStorage.getItem("user")) !== null) {
	uid = JSON.parse(localStorage.getItem("user")).uid;
}

// Creating family
export const createFamily = (famName, password, cb) => {
	const famKey = app.database().ref("/families/").push();
	famKey.set({
		famName: famName,
		creator: uid,
		editors: [uid],
		visitors: [],
		memKeys: [],
		password: password,
	});
	const famKeys = app.database().ref("users/" + uid + "/famKeys");
	var familykeys = [];

	famKeys.once("value", (snap) => {
		familykeys.push(famKey.key);
		var user = localStorage.getItem("user");
		var userUpdate2 = user ? JSON.parse(user) : {};
		console.log("createFamily -> userUpdate2", userUpdate2);

		if (snap.val() !== null) {
			if (snap.val().familykeys.length === 1) {
				familykeys.push(snap.val().familykeys[0]);
				userUpdate2["famKey"] = familykeys;
				console.log("createFamily -> userUpdate2", userUpdate2);
				localStorage.setItem("user", JSON.stringify(userUpdate2));
				console.log("createFamily -> userUpdate2", userUpdate2);

				famKeys.update({ familykeys });
			} else if (snap.val().familykeys.length > 1) {
				snap.val().familykeys.map((x) => {
					familykeys.push(x);
					userUpdate2["famKey"] = familykeys;
					console.log("createFamily -> userUpdate2", userUpdate2);
					localStorage.setItem("user", JSON.stringify(userUpdate2));
					console.log("createFamily -> userUpdate2", userUpdate2);
				});

				famKeys.update({ familykeys });
			}
		} else {
			userUpdate2["famKey"] = familykeys;
			console.log("createFamily -> userUpdate2", userUpdate2);
			localStorage.setItem("user", JSON.stringify(userUpdate2));
			console.log("createFamily -> userUpdate2", userUpdate2);
			famKeys.update({ familykeys });
		}
	});
	cb("finished!");
};
//Deleting family
export const checkEditors = () => {};
export const deleteFamily = (password, famkey) => {
	var user = localStorage.getItem("user");

	var userUpdate2 = user ? JSON.parse(user) : {};
	console.log("deleteFamily -> userUpdate2", userUpdate2);

	const family = app.database().ref("families/" + famkey);

	var editors = undefined;
	family.once("value", (snap) => {
		if (snap.val() !== null) {
			editors = snap.val().editors;
		} else {
			return;
		}

		if (
			editors.find((ed) => ed === uid) === undefined ||
			password !== snap.val().password
		) {
			console.log("editor!==uid or incorrect password");
			console.log("deleteFamily -> pas", password);
			console.log("uid", uid);
			console.log(snap.val());
		} else {
			family.remove();
			let index = userUpdate2.famKey.findIndex((x) => x === famkey);
			console.log("deleteFamily -> userUpdate2", userUpdate2);
			userUpdate2.famKey.splice(index, index + 1);
			console.log("deleteFamily -> userUpdate2", userUpdate2);
			localStorage.setItem("user", JSON.stringify(userUpdate2));
			console.log("deleteFamily -> userUpdate2", userUpdate2);

			var keys = [];
			var familykeys = app
				.database()
				.ref("users/" + uid + "/famKeys/familykeys");

			familykeys.once("value", (snap) => {
				let index = snap.val().findIndex((x) => x === famkey);
				keys = snap.val();
				keys.splice(index, index + 1);
				familykeys.set(keys);
			});
		}
	});
};
export const addEditors = () => {};
// FamAdmin
export const handleLinkAdd = (cb, famkey, password) => {
	console.log(famkey, "password :", password);
	var visitors = [uid];
	var fam = app.database().ref("families/" + famkey);
	// check if family exists

	fam.once("value", (snap) => {
		var user = localStorage.getItem("user");
		var userUpdate2 = user ? JSON.parse(user) : {};
		if (snap.val() === null) {
			cb(false, "no family found");
		} else {
			if (snap.val().visitors === undefined) {
				fam.child("visitors").set(visitors);
				userUpdate2.famKey.push(famkey);
				localStorage.setItem("user", JSON.stringify(userUpdate2));
				app
					.database()
					.ref("users/" + uid + "/famKeys/familykeys")
					.set(userUpdate2.famKey);
			} else if (snap.val().visitors.find((x) => uid === x)) {
				cb(false, "already in visitors");
				console.log(uid, "snap", snap.val().visitors);
			} else {
				console.log("else");
				userUpdate2.famKey.push(famkey);
				console.log("=+++++", userUpdate2);
				localStorage.setItem("user", JSON.stringify(userUpdate2));
				app
					.database()
					.ref("users/" + uid + "/famKeys/familykeys/")
					.set(userUpdate2.famKey);
				snap.val().visitors.map((v) => {
					visitors.push(v);
				});
				cb(true, "Family added");
			}
			fam.child("visitors").set(visitors);
		}
		// cb("added to visitors")
	});
};
export const updateList = (cb, famkey) => {
	const fam = app.database().ref("families/" + famkey);
	fam.child("editors").on("value", (snap) => {
		snap.val() === null
			? cb(null, null)
			: snap.val().map((e) => {
					cb("editor", e);
			  });
	});

	fam.child("visitors").on("value", (snap) => {
		snap.val() === null
			? cb(null, null)
			: snap.val().map((v) => {
					cb("visitor", v);
			  });
	});
};
export const getEmail = (x) => {
	return app
		.database()
		.ref("users/" + x)
		.once("value", (snap) => {
			snap.val();
		});
};
export const setPermissions = (id, famkey, place) => {
	var placeInDb = "";
	var placeInDb2 = "";
	var arrayDb = [];
	var arrayMo = [];
	if (place === "visitors") {
		placeInDb = app.database().ref("families/" + famkey + "/visitors/");
		placeInDb2 = app.database().ref("families/" + famkey + "/editors/");
	} else {
		placeInDb2 = app.database().ref("families/" + famkey + "/visitors/");
		placeInDb = app.database().ref("families/" + famkey + "/editors/");
	}

	console.log("setPermissions -> place", place);
	placeInDb.once("value", (snap) => {
		arrayDb = snap.val();
		console.log("setPermissions -> arrayDb", arrayDb);
		let index = arrayDb.findIndex((id) => id === id);
		arrayDb.splice(index, index + 1);
		placeInDb.set(arrayDb);
		placeInDb2.once("value", (snap) => {
			arrayMo = snap.val();
			if (arrayMo === null) {
				arrayMo = [id];
				placeInDb2.set(arrayMo);
			} else {
				arrayMo.push(id);
				placeInDb2.set(arrayMo);
			}
			console.log("arrayMo" + arrayMo);
		});
	});
	//array
	// if place visitors
	//get arr
	// set arr to array
	//delete uid from array
	//set array

	//editors place
	//get arr
	//set arr to array
	//push uid to array
	//set array
};
// gettin family name
export const GetFamName = (famKey) => {
	const fam = app.database().ref("families/" + famKey + "/famName/");
	return fam.once("value", (snap) => {
		return snap.val().key;
	});
};
// Adding Relative
export const getKey = (type) => app.database().ref(type).push().key;

export const familyMemberKeys = (memKey, famKey) => {
	const famKeys = app.database().ref("/families/" + famKey + "/memKeys/");
	var famKeysArray = [memKey];

	famKeys.once("value", (snap) => {
		if (!!snap.val()) {
			snap.val().map((key) => {
				famKeysArray.push(key);
			});
		} else {
			return null;
		}
		famKeys.set(famKeysArray);
	});
};
export const addToMembers = (memKey, data) => {
	setTimeout(() => {
		app
			.database()
			.ref("members/" + memKey + "/")
			.update(data);
	}, 2000);
};
export const addMemberToDb = (relKey, memKey, type) => {
	const relKeys = app.database().ref("/members/" + relKey + type);
	var relKeysArray = [];

	relKeys.once("value", (snap) => {
		if (snap.val() === null || !!snap.val === false) {
			relKeysArray.push(memKey);
		} else {
			var x = snap.val();
			x.map((z) => {
				relKeysArray.push(z);
			});
			relKeysArray.push(memKey);
		}

		var objectArray = Object.values(relKeysArray);
		relKeys.set(objectArray);
	});
};
// MemberComponent
export const listenMemberData = (memKey) => {
	return app.database().ref("/members/" + memKey);
};

// adding user and deciding if he exists then login him
export const addUserToDb = (uid, displayName, photoURL, email) => {
	const userData = {
		uid: uid,
		name: displayName,
		photo: photoURL,
		email: email,
		isLoggedIn: true,
		// delete
		famKey: null,
	};
	const userLocationInDb = app.database().ref("users/" + uid + "/");
	const user = app.database().ref("users/" + uid);

	user.once("value", (snap) => {
		// if not exist
		if (snap.val() === null) {
			userLocationInDb.update(userData);
			addToLocalStorage(userData);
			addToLocalStorage({ "first visit": true });
		}
		// if exists
		else {
			const getFamKey = app
				.database()
				.ref("users/" + uid + "/famKeys/familykeys/");
			getFamKey.once("value", (snap) => {
				userData.famKey = snap.val();
				addToLocalStorage(userData);
				uid = JSON.parse(localStorage.user).uid;
			});
			app
				.database()
				.ref("users/" + uid + "/")
				.update({ isLoggedIn: true });
		}
	});
};
export const setLogOut = () => {
	const uid = JSON.parse(window.localStorage.getItem("user")).uid;
	app
		.database()
		.ref("users/" + uid + "/")
		.update({ isLoggedIn: false });
	logOut();
};

export const listenUserData = (uid) => {
	return app.database().ref("users/" + uid);
};
// check user permissions
export const checkPermissions = (famKey, callback) => {
	const uid = JSON.parse(localStorage.getItem("user")).uid;
	var famEditors = app.database().ref("families/" + famKey + "/editors");

	famEditors.once("value", (snap) => {
		var type = "sdf";
		if (snap.val().find((ed) => ed === uid) === undefined) {
			// app.database().ref('families/'+famKey+'/creators').once
			console.log(snap.val());
		} else {
			callback("editor");
		}
		return type;
	});
};
// editingMember
export const editMember = (data) => {
	const memData = listenMemberData(data.memKey);
	memData.update({
		name: data.name,
		description: data.description,
		residence: data.residence,
	});
};
export const deleteMember = (memKey, famKey) => {
	var parentKey = null;
	const getParentKey = app.database().ref("/members/" + memKey + "/parent/");
	getParentKey.once("value", (snap) => {
		if (snap.val !== null) {
			parentKey = snap.val();
		}
	});

	//operation on parent object in database
	const childrenInDb = app
		.database()
		.ref("/members/" + parentKey + "/children/");
	const children = [];

	childrenInDb.once("value", (snap) => {
		if (snap.val() !== null) {
			snap.val().map((key) => {
				if (key !== memKey) {
					children.push(key);
				} else {
					return null;
				}
			});
			childrenInDb.set(children);
		}
	});

	// operation on family/memKeys/
	const childInFamkeys = app
		.database()
		.ref("/families/" + famKey + "/memKeys/");
	const childInFamKeysArray = [];
	childInFamkeys.once("value", (snap) => {
		if (snap.val() !== null) {
			snap.val().map((key) => {
				if (key !== memKey) {
					childInFamKeysArray.push(key);
				} else {
					return null;
				}
			});
			childInFamkeys.set(childInFamKeysArray);
		}
	});

	// delete in partner
	var partnerKey = null;
	const getPartnerKey = app.database().ref("/members/" + memKey + "/partner/");

	getPartnerKey.once("value", (snap) => {
		if (snap.val !== null) {
			partnerKey = snap.val();
		}
	});

	const partnerInDb = app
		.database()
		.ref("/members/" + partnerKey + "/partner/");
	partnerInDb.set([]);

	// delete its children
	const memberChildren = app
		.database()
		.ref("/members/" + memKey + "/children/");
	memberChildren.once("value", (snap) => {
		if (snap.val() !== null) {
			snap.val().map((key) => {
				if (key !== memKey) {
					app.database().ref("/members/").child(key).remove();
				} else {
					return null;
				}
			});
		}
	});

	// delete member in members
	listenMemberData(memKey).remove();
};
