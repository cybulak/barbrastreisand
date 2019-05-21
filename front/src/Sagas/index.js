import { takeLatest, all } from 'redux-saga/effects';

import { Types as AuthTypes } from '../Reducer/authReducer';
import { Types as RegisterTypes } from '../Reducer/registrationReducer';
import {
	login,
	loginSuccess,
	logout,
	register,
	registerSuccess
} from './userSaga';

function* sagas() {
	yield all([
		takeLatest(AuthTypes.LOGIN_REQUEST, login),
		takeLatest(AuthTypes.LOGIN_SUCCESS, loginSuccess),
		takeLatest(AuthTypes.LOGOUT, logout),
		takeLatest(RegisterTypes.REGISTER_REQUEST, register),
		takeLatest(RegisterTypes.REGISTER_SUCCESS, registerSuccess)
	]);
}

export default sagas;
