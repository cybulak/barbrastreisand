import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as authReducer } from './authReducer';
import { reducer as registrationReducer } from './registrationReducer';

export default history =>
	combineReducers({
		authReducer,
		registrationReducer,
		router: connectRouter(history)
	});
