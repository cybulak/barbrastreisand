import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
	loginRequest: ['username', 'password'],
	loginSuccess: ['user'],
	loginFailure: ['error'],
	logout: null
});

const INITIAL_STATE = Immutable({
	user: null,
	loggedIn: false,
	logging: false
});

const setLogging = state => state.merge({ logging: true });

const setLoggedIn = state => state.merge({ loggedIn: true });

const setUser = (state, { user }) => state.merge({ user });

const setLogout = state => state.merge({ loggedIn: false, user: null });

const setLoggingFinished = state => state.merge({ logging: false });

const reducer = createReducer(INITIAL_STATE, {
	[Types.LOGIN_REQUEST]: setLogging,
	[Types.LOGIN_SUCCESS]: setLoggedIn,
	[Types.LOGIN_SUCCESS]: setUser,
	[Types.LOGIN_FAILURE]: setLoggingFinished,
	[Types.LOGOUT]: setLogout
});

export { reducer, INITIAL_STATE, Types, Creators };
