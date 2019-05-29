import { restClient } from './restClient';
// import { authHeader } from '../Helpers';

export const userService = {
	login,
	logout,
	register
};

async function login(email, password) {
	try {
		const user = await restClient.login(email, password);
		localStorage.setItem('user', JSON.stringify(user.data.user));
		return user;
	} catch (error) {
		throw error;
	}
}

function logout() {
	localStorage.removeItem('user');
}

async function register(firstname, lastname, email, password) {
	try {
		const user = await restClient.register(
			firstname,
			lastname,
			email,
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
