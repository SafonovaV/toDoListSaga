import { combineReducers } from 'redux';
import casesReducer from './cases/casesReduser';
import modalReducer from './modal/modalReducer';
import authReducer from './auth/reducer';
import loadingReducer from './isLoading/reducer';
export default combineReducers({
  cases: casesReducer,
  modal: modalReducer,
  isAuth: authReducer,
  isLoading: loadingReducer,
});
