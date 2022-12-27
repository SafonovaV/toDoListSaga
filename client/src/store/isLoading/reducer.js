import * as tp from './type';

const initialState = {
  isLoading: false,
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case tp.SET_TRUE:
      return { ...state, isLoading: action.payload };
    case tp.SET_FALSE:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
