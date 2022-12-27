import * as tp from './type';
const initialState = {
  isAuth: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case tp.INIT_AUTH:
      return { isAuth: action.payload };
    case tp.SET_NULL:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}
