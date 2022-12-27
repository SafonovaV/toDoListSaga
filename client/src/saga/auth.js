import { call, put, takeEvery } from 'redux-saga/effects';

import * as tp from '../store/auth/type';
import * as actions from '../store/auth/creators';
import { checkAuthFetch, loginAuthFetch, logoutFetch } from './authFetch';
import { setLoadinTrue, setLoadinFalse } from '../store/isLoading/creators';
import {
  setErrAuthFalseAC,
  setErrAuthTrueAC,
} from '../store/errorAuth/creators';

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

function* loginAuth(state) {
  console.log('state', state);
  try {
    yield put(setLoadinTrue());
    const { password, email, navigate } = state.payload;
    const { user } = yield call(loginAuthFetch, { password, email });
    console.log('user', user);
    if (user) {
      yield put(setLoadinFalse());
      yield put(actions.initAuthAC(user));
      yield put(setErrAuthFalseAC());
      yield navigate('/home');
    } else {
      yield put(setErrAuthTrueAC());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.initAuthErrAC(error));
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
}
export default authSagaWatcher;
