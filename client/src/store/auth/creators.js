import * as tp from './type';

export function startLoginAuthAC(password, email, navigate) {
  return { type: tp.START_LOGIN_AUTH, payload: { password, email, navigate } };
}
export function startSignunpAuthAC(login, password, email, navigate) {
  return {
    type: tp.START_SIGNUP_AUTH,
    payload: { login, password, email, navigate },
  };
}
export function startCheckAuthAC() {
  return { type: tp.START_CHECK_AUTH };
}
export function initAuthAC(user) {
  return { type: tp.INIT_AUTH, payload: user };
}
export function initAuthErrAC(err) {
  return { type: tp.INIT_AUTH_ERR, payload: err };
}

export function startLogoutAC() {
  return { type: tp.START_LOGOUT_AUTH };
}
export function setNullAC() {
  return { type: tp.SET_NULL, payload: null };
}
export function logoutAuthErrAC(err) {
  return { type: tp.LOGOUT_AUTH_ERR, payload: err };
}
