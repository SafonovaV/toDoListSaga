import * as tp from './type';
export function setLoadinTrue() {
  return { type: tp.SET_TRUE, payload: true };
}

export function setLoadinFalse() {
  return { type: tp.SET_TRUE, payload: false };
}
