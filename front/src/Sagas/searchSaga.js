import { call, put, select } from 'redux-saga/effects';

import { restClient } from '../Services/restClient';
import { Creators as SearchActions } from '../Reducer/searchReducer';
import history from '../Helpers/history';

export function* search() {
	try {
		const getSearchReducer = state => state.searchReducer;
		const { lat, lng } = yield select(getSearchReducer);
		if (!lat || !lng) return;
		const data = yield call(restClient.search, lat, lng);

		yield put(SearchActions.searchRequestSuccess(data.data.searchResults));
		// history.push('/searchResult');
	} catch (err) {
		console.log('error', err);
	}
}

export function* geolocate() {
	// TODO: GEOLOCATION
	console.log('start geolocate');
	const geolocation = navigator.geolocation;

	const location = yield new Promise((resolve, reject) => {
		if (!geolocation) {
			reject(new Error('Geolocation not supported'));
		}

		geolocation.getCurrentPosition(
			position => resolve(position),
			() => reject(new Error('Permission denied'))
		);
	});

	const {
		coords: { latitude, longitude }
	} = location;

	console.log('latitude', latitude);
	console.log('longitude', longitude);
	yield put(SearchActions.geocodeSuccess(latitude, longitude));
}
