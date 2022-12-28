import * as tp from './type';
const initialState = {
  isAuth: null,
  error: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case tp.INIT_AUTH:
      return { ...state, isAuth: action.payload };
    case tp.SET_NULL:
      return { ...state, isAuth: action.payload };
    case tp.INIT_AUTH_ERR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
