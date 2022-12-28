import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startSignunpAuthAC } from '../../store/auth/creators';

import { getIsLoading } from '../../store/isLoading/selector';
import AppLoader from '../Loading/Loading';

function Signup() {
  const error = useSelector((state) => state.isAuth.error);
  const isLoading = useSelector(getIsLoading());
  const [formValue, setFormValue] = useState({
    login: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = (e) => {
    e.preventDefault();
    const { login, password, email } = e.target;
    dispatch(
      startSignunpAuthAC(login.value, password.value, email.value, navigate)
    );
  };

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormValue((currentValue) => {
      return { ...currentValue, [name]: value };
    });
  };
  if (isLoading) return <AppLoader />;
  return (
    <Form className="container" onSubmit={auth}>
      {error === 'Пользователь с такой почтой уже существует' && (
        <div style={{ color: 'red' }}>
          Пользователь с такой почтой уже существует
        </div>
      )}
      <Form.Group className="mb-3">
        <Form.Control
          name="login"
          value={formValue.login}
          onChange={handleInput}
          type="text"
          placeholder="Login"
        />
      </Form.Group>
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

export default Signup;
