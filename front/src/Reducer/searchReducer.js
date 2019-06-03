import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
	searchRequest: null,
	searchRequestSuccess: ['searchResults'],
	geocodeSuccess: ['latitude', 'longitude'],
	autocompleteSuccess: ['lat', 'lng'],
	geocode: null
});

const INITIAL_STATE = Immutable({
	lat: null,
	lng: null,
	searchResult: null,
	searching: false,
	geocoding: false
});

const setCoordinates = (state, { lat, lng }) => state.merge({ lat, lng });

const setSearchResults = (state, { searchResults }) =>
	state.merge({ searchResults, searching: false });

const setSearching = state => state.merge({ searching: true });

const setGeocoding = state => state.merge({ geocoding: true });

const geocodingSucces = (state, { latitude, longitude }) =>
	state.merge({ geocoding: false, lat: latitude, lng: longitude });

const reducer = createReducer(INITIAL_STATE, {
	[Types.SEARCH_REQUEST]: setSearching,
	[Types.SEARCH_REQUEST_SUCCESS]: setSearchResults,
	[Types.GEOCODE_SUCCESS]: geocodingSucces,
	[Types.AUTOCOMPLETE_SUCCESS]: setCoordinates,
	[Types.GEOCODE]: setGeocoding
});

export { reducer, INITIAL_STATE, Types, Creators };
