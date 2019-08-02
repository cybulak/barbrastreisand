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
			name: 'Barber 1',
			lat: 52.282065,
			lng: 21.046829
		},
		{
			id: 2,
			name: 'Barber 2',
			lat: 52.266016,
			lng: 20.9968
		},
		{
			id: 3,
			name: 'Barber 3',
			lat: 52.237714,
			lng: 21.041197
		},
		{
			id: 4,
			name: 'Barber 4',
			lat: 52.317373,
			lng: 20.966399
		}
	];

	mock.onPost('/login').reply(200, {
		user: sampleUser
	});

	mock.onPost('/register').reply(200, {
		user: sampleUser
	});

	mock.onGet('/search').reply(200, {
		searchResults: sampleResults
	});
};

export default mockApi;
