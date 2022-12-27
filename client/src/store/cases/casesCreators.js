import * as tp from './casesType';
import { setLoadinFalse, setLoadinTrue } from '../isLoading/creators';
import { setVisModalFalse } from '../modal/modalCreators';

export const startInitCasesAC = () => {
  return {
    type: tp.START_INIT_CASES,
  };
};
export const initCases = (allCases) => {
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
export const addNewCase = (newCase) => {
  return { type: tp.ADD_CASES, payload: newCase };
};
export const addNewCaseErr = (error) => {
  return { type: tp.ADD_CASES_ERR, payload: error };
};

//-----------------------------------------------------

export const startChangeCase = (title, description, caseId) => {
  return { type: tp.START_EDIT_CASES, payload: { title, description, caseId } };
};
export const changeCase = (editCase) => {
  return { type: tp.EDIT_CASES, payload: editCase };
};
export const changeCaseErr = (err) => {
  return { type: tp.EDIT_CASES_ERR, payload: err };
};
//----------------------------------------------

export const deleteCase = (id) => {
  return { type: tp.DELETE_CASES, payload: id };
};

export const setStatusZero = (id) => {
  return { type: tp.SET_STATUS_ZERO, payload: id };
};

export const setStatusOne = (id) => {
  return { type: tp.SET_STATUS_ONE, payload: id };
};

// export const getAllCasesAC = () => async (dispatch) => {
//   dispatch(setLoadinTrue());
//   try {
//     const response = await fetch('http://localhost:3005/case/all', {
//       method: 'GET',
//       credentials: 'include',
//     });
//     const { allCases } = await response.json();

//     dispatch(initCases(allCases));
//     dispatch(setLoadinFalse());
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const editCaseAndModalAC = (e, id) => async (dispatch) => {
//   dispatch(setLoadinTrue());
//   dispatch(setVisModalFalse());

//   const response = await fetch(`http://localhost:3005/case/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({ title, description }),
//   });
//   const { newEditCase } = await response.json();
//   dispatch(changeCase(newEditCase));
//   dispatch(setLoadinFalse());
// };

// export const creatNewCase = (e, setFormValue) => async (dispatch) => {
//   dispatch(setLoadinTrue());

//   const response = await fetch('http://localhost:3005/case', {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       title: title.value,
//       description: description.value,
//     }),
//   });
//   const { newCase } = await response.json();

//   if (newCase) {
//     dispatch(setLoadinFalse());
//     dispatch(addNewCase(newCase));
//     setFormValue({ title: '', description: '' });
//   }
// };

export const changeStatusAC = (oneCase) => async (dispatch) => {
  dispatch(setLoadinTrue());
  try {
    const response = await fetch(`http://localhost:3005/case/${oneCase.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: null,
    });
    const { answer } = await response.json();
    if (answer[0] === 1) {
      oneCase.status
        ? dispatch(setStatusZero(oneCase.id))
        : dispatch(setStatusOne(oneCase.id));

      dispatch(setLoadinFalse());
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCaseAC = (id) => async (dispatch) => {
  dispatch(setLoadinTrue());
  try {
    const response = await fetch(`http://localhost:3005/case/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: null,
    });
    const answer = await response.json();
    if (answer === 1) {
      dispatch(deleteCase(id));
      dispatch(setLoadinFalse());
    }
  } catch (error) {
    console.log(error);
  }
};
