import { all } from 'redux-saga/effects';
import authSagaWatcher from './auth/auth';
import casesSagaWatcher from './case/cases';

export default function* rootSaga() {
  yield all([authSagaWatcher(), casesSagaWatcher()]);
}
