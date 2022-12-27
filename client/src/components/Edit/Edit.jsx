import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cl from './Edit.module.css';
import { startChangeCase } from '../../store/cases/casesCreators';

export default function Edit() {
  const dispatch = useDispatch();

  const editCase = useSelector((state) => state.modal.modal.editCase);

  const [formValue, setFormValue] = useState({
    title: editCase.title,
    description: editCase.description,
  });
  useEffect(() => {
    setFormValue({ title: editCase.title, description: editCase.description });
  }, [editCase]);

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormValue((currentFormValue) => {
      return { ...currentFormValue, [name]: value };
    });
  };

  const editCaseAndModal = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    dispatch(startChangeCase(title, description, editCase.id));
  };

  return (
    <form onSubmit={editCaseAndModal} className={cl.form}>
      <input
        className={cl.form_title}
        type="text"
        name="title"
        placeholder="название"
        value={formValue.title}
        onChange={handleInput}
      />
      <textarea
        className={cl.form_description}
        type="text"
        name="description"
        placeholder="описание"
        value={formValue.description}
        onChange={handleInput}
      />
      <button className={cl.button} type="submit">
        Изменить
      </button>
    </form>
  );
}
