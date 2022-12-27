import * as tp from './type';
export function setErrAuthTrueAC() {
  return { type: tp.SET_ERRAUTH_TRUE, payload: true };
}

export function setErrAuthFalseAC() {
  return { type: tp.SET_ERRAUTH_FALSE, payload: false };
}
