import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
	loginRequest: ['email', 'password'],
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

const setUser = (state, { user }) =>
	state.merge({ user, loggedIn: true, logging: false });

const setLogout = state =>
	state.merge({ loggedIn: false, user: null, logging: false });

const setLoggingFinished = state => state.merge({ logging: false });

const reducer = createReducer(INITIAL_STATE, {
	[Types.LOGIN_REQUEST]: setLogging,
	[Types.LOGIN_SUCCESS]: setUser,
	[Types.LOGIN_FAILURE]: setLoggingFinished,
	[Types.LOGOUT]: setLogout
});

export { reducer, INITIAL_STATE, Types, Creators };
