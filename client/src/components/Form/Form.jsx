import React, { useState } from 'react';
import cl from './Form.module.css';
import { useDispatch } from 'react-redux';
import {  creatNewCase } from '../../store/cases/casesCreators';

export default function Form() {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({ title: '', description: '' });

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormValue((currentFormValue) => {
      return { ...currentFormValue, [name]: value };
    });
  };
  const onSubmitHandle = (e) => {
    dispatch(creatNewCase(e, setFormValue));
  };

  return (
    <form onSubmit={onSubmitHandle} className={cl.form}>
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
        Добавить
      </button>
    </form>
  );
}
