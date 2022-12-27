import React from 'react';
import cl from './MyModal.module.css';
import { setVisModalFalse } from '../../store/modal/modalCreators';
import { useSelector, useDispatch } from 'react-redux';

function MyModal({ children }) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.modal.visible);
  const rootClass = [cl.myModal];
  if (visible) {
    rootClass.push(cl.myModalActive);
  }
  return (
    <div
      onClick={() => {
        dispatch(setVisModalFalse());
      }}
      className={rootClass.join(' ')}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cl.myModalContent}
      >
        {children}
      </div>
    </div>
  );
}

export default MyModal;
