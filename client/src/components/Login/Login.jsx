import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { startLoginAuthAC } from '../../store/auth/creators';
import { useNavigate } from 'react-router-dom';
import { getIsLoading } from '../../store/isLoading/selector';
import AppLoader from '../Loading/Loading';

export default function Login() {
  const error = useSelector((state) => state.isAuth.error);
  console.log('error', error);
  const isLoading = useSelector(getIsLoading());
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = (e) => {
    e.preventDefault();
    const { password, email } = e.target;

    dispatch(startLoginAuthAC(password.value, email.value, navigate));
  };

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormValue((currentValue) => {
      return { ...currentValue, [name]: value };
    });
  };
  if (isLoading) {
    return <AppLoader />;
  }
  return (
    <Form className="container" onSubmit={auth}>
      {error === 'Неверный логин или пароль' && (
        <div style={{ color: 'red' }}>Неверный логин или пароль</div>
      )}
      <Form.Group className="mb-3">
        <Form.Control
          name="email"
          value={formValue.email}
          onChange={handleInput}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          name="password"
          value={formValue.password}
          onChange={handleInput}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
