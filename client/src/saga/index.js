import { all } from 'redux-saga/effects';
import authSagaWatcher from './auth';

export default function* rootSaga() {
  yield all([authSagaWatcher()]);
}
