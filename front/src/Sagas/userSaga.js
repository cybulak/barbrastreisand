import { call, put } from 'redux-saga/effects';

import { restClient } from '../Services/restClient';
import { Creators as AuthActions } from '../Reducer/authReducer';
import { Creators as RegisterActions } from '../Reducer/registrationReducer';
import history from '../Helpers/history';

export function* login(action) {
	try {
		const { email, password } = action;
		const user = yield call(restClient.login, email, password);
		yield put(AuthActions.loginSuccess(user.data.user));
	} catch (error) {
		yield put(AuthActions.loginFailure(error));
	}
}

export function* loginSuccess(action) {
	try {
		const { user } = action;
		localStorage.setItem('user', JSON.stringify(user));
		history.push('/search');
		return user;
	} catch (error) {
		yield put(AuthActions.loginFailure(error));
	}
}

export function* logout() {
	try {
		localStorage.removeItem('user');
		history.push('/login');
	} catch (error) {
		yield put(AuthActions.loginFailure(error));
	}
}

export function* register(action) {
	try {
		const { firstname, lastname, email, password } = action;
		const user = yield call(
			restClient.register,
			firstname,
			lastname,
			email,
			password
		);
		yield put(RegisterActions.registerSuccess(user.data.user));
	} catch (error) {
		yield put(RegisterActions.registerFailure(error));
	}
}

export function* registerSuccess(action) {
	try {
		const { user } = action;
		localStorage.setItem('user', JSON.stringify(user));
		history.push('/');
		return user;
	} catch (error) {
		yield put(RegisterActions.registerFailure(error));
	}
}
