import * as tp from './type';
const initialState = {
  errorAuth: false,
};

export default function errorAuthReducer(state = initialState, action) {
  switch (action.type) {
    case tp.SET_ERRAUTH_TRUE:
      return { ...state, errorAuth: action.payload };
    case tp.SET_ERRAUTH_FALSE:
      return { ...state, errorAuth: action.payload };
    default:
      return state;
  }
}
