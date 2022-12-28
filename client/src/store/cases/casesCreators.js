import * as tp from './casesType';

export const startInitCasesAC = () => {
  return {
    type: tp.START_INIT_CASES,
  };
};
export const initCasesAC = (allCases) => {
  return { type: tp.INIT_CASES, payload: allCases };
};
export const initCasesErrAC = (err) => {
  return { type: tp.INIT_CASES_ERR, payload: err };
};

//---------------------------------

export const startAddNewCaseAC = (title, description, setFormValue) => {
  return {
    type: tp.START_ADD_CASES,
    payload: { title, description, setFormValue },
  };
};
export const addNewCaseAC = (newCase) => {
  return { type: tp.ADD_CASES, payload: newCase };
};
export const addNewCaseErrAC = (error) => {
  return { type: tp.ADD_CASES_ERR, payload: error };
};

//-----------------------------------------------------

export const startChangeCaseAC = (title, description, caseId) => {
  return { type: tp.START_EDIT_CASES, payload: { title, description, caseId } };
};
export const changeCaseAC = (editCase) => {
  return { type: tp.EDIT_CASES, payload: editCase };
};
export const changeCaseErrAC = (err) => {
  return { type: tp.EDIT_CASES_ERR, payload: err };
};

//----------------------------------------------

export const startChangeStatusCaseAC = (oneCase) => {
  return { type: tp.START_CHANGE_STATUS_CASE, payload: oneCase };
};
export const setStatusZeroAC = (id) => {
  return { type: tp.SET_STATUS_ZERO, payload: id };
};
export const setStatusOneAC = (id) => {
  return { type: tp.SET_STATUS_ONE, payload: id };
};
export const changeStatusCaseErrAC = (err) => {
  return { type: tp.CHANGE_STATUS_CASE_ERR, payload: err };
};

//----------------------------------------------------------

export const startDeleteCaseAC = (id) => {
  return { type: tp.START_DELETE_CASES, payload: id };
};
export const deleteCaseAC = (id) => {
  return { type: tp.DELETE_CASES, payload: id };
};
export const deleteCaseErrAC = (err) => {
  return { type: tp.DELETE_CASES_ERR, payload: err };
};
