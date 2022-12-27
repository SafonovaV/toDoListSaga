import * as tp from './modalType';
export function setVisModalTrue() {
  return { type: tp.SET_VISIBLE_TRUE, payload: true };
}

export function setVisModalFalse() {
  return { type: tp.SET_VISIBLE_FALSE, payload: false };
}

export function initEditCase(editCase) {
  return { type: tp.INIT_EDIT_CASE, payload: editCase };
}
