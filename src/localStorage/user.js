export const addToLocalStorage = (userData) => {
	window.localStorage.setItem("user", JSON.stringify(userData));
};
export const getFromLocalStorage = () => {
	// return JSON.parse(localStorage.user);

	return JSON.parse(window.localStorage.getItem("user"));
};

export const logOut = () => {
	window.localStorage.clear();
};
