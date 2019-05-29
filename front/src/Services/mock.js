import MockAdapter from 'axios-mock-adapter';
import { instance } from './restClient';

const mockApi = () => {
	const mock = new MockAdapter(instance, { delayResponse: 2000 });

	const sampleUser = {
		fistname: 'Mocker',
		lastname: 'Mocker2',
		email: 'Mocker',
		token: 'sampleToken'
	};

	mock.onPost('/login').reply(200, {
		user: sampleUser
	});

	mock.onPost('/register').reply(200, {
		user: sampleUser
	});
};

export default mockApi;
