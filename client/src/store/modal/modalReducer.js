import * as tp from './modalType';
const initialState = {
  modal: {
    visible: false,
    editCase: { title: 'eee', description: 'eee' },
  },
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case tp.SET_VISIBLE_TRUE:
      return { ...state, modal: { ...state.modal, visible: action.payload } };
    case tp.SET_VISIBLE_FALSE:
      return { ...state, modal: { ...state.modal, visible: action.payload } };
    case tp.INIT_EDIT_CASE:
      return { ...state, modal: { ...state.modal, editCase: action.payload } };
    default:
      return state;
  }
}
