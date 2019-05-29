import axios from 'axios';

const instance = axios.create({
	baseURL: ''
});

class restClient {
	static login = (email, password) =>
		instance.post('/login', {
			email,
			password
		});

	static register = (firstname, lastname, email, password) =>
		instance.post('/register', {
			firstname,
			lastname,
			email,
			password
		});
}

export { restClient, instance };
