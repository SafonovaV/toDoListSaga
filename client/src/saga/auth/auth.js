import { call, put, takeEvery } from 'redux-saga/effects';

import * as tp from '../../store/auth/type';
import * as actions from '../../store/auth/creators';
import {
  checkAuthFetch,
  loginAuthFetch,
  logoutFetch,
  signUpFetch,
} from './authFetch';
import { setLoadinTrue, setLoadinFalse } from '../../store/isLoading/creators';

function* checkAuth() {
  try {
    const { user } = yield call(checkAuthFetch);
    if (user) {
      yield put(actions.initAuthAC(user));
    } else {
      yield put(actions.setNullAC());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.initAuthErrAC(error));
  }
}

function* authSignUp(state) {
  yield put(setLoadinTrue());
  const { login, password, email, navigate } = state.payload;
  try {
    const res = yield call(signUpFetch, { login, password, email });
    if (res.ok) {
      const { user } = yield res.json();
      yield put(setLoadinFalse());
      yield put(actions.initAuthAC(user));

      navigate('/home');
    } else {
      const { message } = yield res.json();
      yield put(actions.initAuthErrAC(message));
      yield put(setLoadinFalse());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.initAuthErrAC(error.message));
  }
}

function* loginAuth(state) {
  try {
    yield put(setLoadinTrue());
    const { password, email, navigate } = state.payload;
    const res = yield call(loginAuthFetch, { password, email });

    if (res.ok) {
      const { user } = yield res.json();
      yield put(setLoadinFalse());
      yield put(actions.initAuthAC(user));
      yield navigate('/home');
    } else {
      const { message } = yield res.json();
      yield put(actions.initAuthErrAC(message));
      yield put(setLoadinFalse());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.initAuthErrAC(error.message));
    yield put(setLoadinFalse());
  }
}

function* logoutAuth() {
  yield put(setLoadinTrue());
  try {
    const res = yield call(logoutFetch);
    if (res.ok) {
      yield put(actions.setNullAC());
      yield put(setLoadinFalse());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.logoutAuthErrAC(error));
  }
}

function* authSagaWatcher() {
  yield takeEvery(tp.START_CHECK_AUTH, checkAuth);
  yield takeEvery(tp.START_LOGIN_AUTH, loginAuth);
  yield takeEvery(tp.START_LOGOUT_AUTH, logoutAuth);
  yield takeEvery(tp.START_SIGNUP_AUTH, authSignUp);
}
export default authSagaWatcher;
