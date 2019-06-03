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

	const sampleResults = [
		{
			id: 1,
			name: 'Barber 1'
		},
		{
			id: 2,
			name: 'Barber 2'
		}
	];

	mock.onPost('/login').reply(200, {
		user: sampleUser
	});

	mock.onPost('/register').reply(200, {
		user: sampleUser
	});

	mock.onGet('/search').reply(200, {
		searchResults: sampleResults,
	});
};

export default mockApi;
