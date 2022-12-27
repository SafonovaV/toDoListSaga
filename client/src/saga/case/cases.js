import { call, put, takeEvery } from 'redux-saga/effects';
import * as tp from '../../store/cases/casesType';
import * as actions from '../../store/cases/casesCreators';
import { setLoadinFalse, setLoadinTrue } from '../../store/isLoading/creators';
import { getAllCasesFetch, createCaseFetch, editCaseFetch } from './casesFetch';
import { setVisModalFalse } from '../../store/modal/modalCreators';

function* startInitCase() {
  yield put(setLoadinTrue());
  try {
    const { allCases } = yield call(getAllCasesFetch);
    yield put(actions.initCases(allCases));
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
      yield put(actions.addNewCase(newCase));
      setFormValue({ title: '', description: '' });
    }
  } catch (error) {
    console.log(error);
    yield put(actions.addNewCaseErr(error));
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
    yield put(actions.changeCase(newEditCase));
    yield put(setLoadinFalse());
  } catch (error) {
    console.log(error);
    yield put(actions.changeCaseErr(error));
  }
}




export default function* casesSagaWatcher() {
  yield takeEvery(tp.START_INIT_CASES, startInitCase);
  yield takeEvery(tp.START_ADD_CASES, addNewCase);
  yield takeEvery(tp.START_EDIT_CASES, editCase);
}
