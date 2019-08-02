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
		history.push('/list');
	} catch (err) {
		console.log('error', err);
	}
}
