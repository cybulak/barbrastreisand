import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
	registerRequest: ['firstname', 'lastname', 'username', 'password'],
	registerSuccess: ['user'],
	registerFailure: ['error']
});

const INITIAL_STATE = Immutable({
	registering: false
});

const setRegistering = state => state.merge({ registering: true });

const setRegisteringFinish = state => state.merge({ registering: false });

const reducer = createReducer(INITIAL_STATE, {
	[Types.REGISTER_REQUEST]: setRegistering,
	[Types.REGISTER_SUCCESS]: setRegisteringFinish,
	[Types.REGISTER_FAILURE]: setRegisteringFinish
});

export { reducer, INITIAL_STATE, Types, Creators };
