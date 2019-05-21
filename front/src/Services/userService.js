import { restClient } from './restClient';
// import { authHeader } from '../Helpers';

export const userService = {
	login,
	logout,
	register
};

async function login(username, password) {
	try {
		const user = await restClient.login(username, password);
		localStorage.setItem('user', JSON.stringify(user.data.user));
		return user;
	} catch (error) {
		throw error;
	}
}

function logout() {
	localStorage.removeItem('user');
}

async function register(firstname, lastname, username, password) {
	try {
		const user = await restClient.register(
			firstname,
			lastname,
			username,
			password
		);
		localStorage.setItem('user', JSON.stringify(user.data.user));
		return user;
	} catch (error) {
		throw error;
	}
}

// function handleResponse(response) {
//     //TODO: logout if 401
// }
