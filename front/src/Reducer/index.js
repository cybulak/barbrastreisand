import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as authReducer } from './authReducer';
import { reducer as registrationReducer } from './registrationReducer';
import { reducer as searchReducer } from './searchReducer';
export default history =>
	combineReducers({
		authReducer,
		registrationReducer,
		searchReducer,
		router: connectRouter(history)
	});
