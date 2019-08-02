import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
	searchRequest: null,
	searchRequestSuccess: ['searchResults'],
	autocompleteSuccess: ['lat', 'lng']
});

const INITIAL_STATE = Immutable({
	lat: null,
	lng: null,
	searchResults: [],
	searching: false
});

const setCoordinates = (state, { lat, lng }) => state.merge({ lat, lng });

const setSearchResults = (state, { searchResults }) =>
	state.merge({ searchResults, searching: false });

const setSearching = state => state.merge({ searching: true });

const reducer = createReducer(INITIAL_STATE, {
	[Types.SEARCH_REQUEST]: setSearching,
	[Types.SEARCH_REQUEST_SUCCESS]: setSearchResults,
	[Types.AUTOCOMPLETE_SUCCESS]: setCoordinates
});

export { reducer, INITIAL_STATE, Types, Creators };
