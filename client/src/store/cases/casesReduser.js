import * as tp from './casesType';
const initialState = {
  cases: [],
};

export default function casesReducer(state = initialState, action) {
  switch (action.type) {
    case tp.INIT_CASES:
      return { cases: action.payload };

    case tp.ADD_CASES:
      return { ...state, cases: [...state.cases, action.payload] };

    case tp.DELETE_CASES:
      return {
        ...state,
        cases: state.cases.filter((el) => el.id !== action.payload),
      };
    case tp.SET_STATUS_TRUE:
      return {
        ...state,
        cases: state.cases.map((el) => {
          if (el.id === action.payload) {
            return { ...el, status: true };
          }
          return el;
        }),
      };
    case tp.SET_STATUS_FALSE:
      return {
        ...state,
        cases: state.cases.map((el) => {
          if (el.id === action.payload) {
            return { ...el, status: false };
          }
          return el;
        }),
      };
    case tp.EDIT_CASES:
      return {
        ...state,
        cases: state.cases.map((el) => {
          if (el.id === action.payload.id) {
            return {
              ...el,
              title: action.payload.title,
              description: action.payload.description,
            };
          }
          return el;
        }),
      };

    default:
      return state;
  }
}
