import * as tp from './type';

import { setLoadinFalse, setLoadinTrue } from '../isLoading/creators';
import { setErrAuthTrueAC, setErrAuthFalseAC } from '../errorAuth/creators';

export function initAuthAC(user) {
  return { type: tp.INIT_AUTH, payload: user };
}

export function setNullAC() {
  return { type: tp.SET_NULL, payload: null };
}

export const authLoginAC = (password, email, navigate) => async (dispatch) => {
  dispatch(setLoadinTrue());
  const response = await fetch('http://localhost:3005/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  });
  const { user } = await response.json();

  if (user) {
    dispatch(setLoadinFalse());
    dispatch(initAuthAC(user));
    dispatch(setErrAuthFalseAC());
    navigate('/home');
  } else dispatch(setErrAuthTrueAC());
};

export const logoutAC = () => async (dispatch) => {
  dispatch(setLoadinTrue());
  const response = await fetch('http://localhost:3005/logout', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  if (response.ok) {
    dispatch(setNullAC());
    dispatch(setLoadinFalse());
  }
};

export const authSignUpAC =
  (login, password, email, navigate) => async (dispatch) => {
    dispatch(setLoadinTrue());
    const response = await fetch('http://localhost:3005/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
        email,
      }),
    });
    const { user } = await response.json();

    if (user) {
      dispatch(setLoadinFalse());
      dispatch(initAuthAC(user));
      dispatch(setErrAuthFalseAC());
      navigate('/home');
    } else {
      dispatch(setErrAuthTrueAC());
      dispatch(setLoadinFalse());
    }
  };

export const checkAuthAC = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3005/checkAuth', {
      method: 'GET',
      credentials: 'include',
    });
    const { user } = await response.json();
    if (user) {
      dispatch(initAuthAC(user));
    } else {
      dispatch(setNullAC());
    }
  } catch (error) {
    console.log(error);
  }
};
