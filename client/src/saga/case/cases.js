import { call, put, takeEvery } from 'redux-saga/effects';
import * as tp from '../../store/cases/casesType';
import * as actions from '../../store/cases/casesCreators';
import { setLoadinFalse, setLoadinTrue } from '../../store/isLoading/creators';
import {
  getAllCasesFetch,
  createCaseFetch,
  editCaseFetch,
  changeStatusCaseFetch,
  deleteCaseFetch,
} from './casesFetch';
import { setVisModalFalse } from '../../store/modal/modalCreators';

function* startInitCase() {
  yield put(setLoadinTrue());
  try {
    const { allCases } = yield call(getAllCasesFetch);
    yield put(actions.initCasesAC(allCases));
    yield put(setLoadinFalse());
  } catch (error) {
    console.log(error);
    yield put(actions.initCasesErrAC(error));
  }
}

function* addNewCase(state) {
  const { title, description, setFormValue } = state.payload;
  yield put(setLoadinTrue());
  try {
    const { newCase } = yield call(createCaseFetch, { title, description });
    if (newCase) {
      yield put(setLoadinFalse());
      yield put(actions.addNewCaseAC(newCase));
      setFormValue({ title: '', description: '' });
    }
  } catch (error) {
    console.log(error);
    yield put(actions.addNewCaseErrAC(error));
  }
}

function* editCase(state) {
  const { title, description, caseId } = state.payload;
  yield put(setLoadinTrue());
  yield put(setVisModalFalse());
  try {
    const { newEditCase } = yield call(editCaseFetch, {
      title,
      description,
      caseId,
    });
    yield put(actions.changeCaseAC(newEditCase));
    yield put(setLoadinFalse());
  } catch (error) {
    console.log(error);
    yield put(actions.changeCaseErrAC(error));
  }
}

function* changeStatus(state) {
  console.log('state  вход в воркер', state);

  const { payload } = state;
  try {
    const { answer } = yield call(changeStatusCaseFetch, payload.id);
    if (answer[0] === 1) {
      payload.status
        ? yield put(actions.setStatusFalseAC(payload.id))
        : yield put(actions.setStatusTrueAC(payload.id));
      console.log('state  после изменения статуса', state);
      yield put(setLoadinFalse());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.changeStatusCaseErrAC(error));
  }
}

function* deleteCase(state) {
  const id = state.payload;
  try {
    const answer = yield call(deleteCaseFetch, id);
    if (answer === 1) {
      yield put(actions.deleteCaseAC(id));
      yield put(setLoadinFalse());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.deleteCaseErrAC(error));
  }
}

export default function* casesSagaWatcher() {
  yield takeEvery(tp.START_INIT_CASES, startInitCase);
  yield takeEvery(tp.START_ADD_CASES, addNewCase);
  yield takeEvery(tp.START_EDIT_CASES, editCase);
  yield takeEvery(tp.START_CHANGE_STATUS_CASE, changeStatus);
  yield takeEvery(tp.START_DELETE_CASES, deleteCase);
}
