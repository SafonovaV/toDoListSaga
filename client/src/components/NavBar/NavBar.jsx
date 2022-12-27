import React from 'react';
import cl from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startLogoutAC } from '../../store/auth/creators';

export default function NavBar() {
  const isAuth = useSelector((store) => store.isAuth.isAuth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(startLogoutAC());
  };

  return (
    <nav className={[cl.nav, cl.forBoard].join('')}>
      {isAuth ? (
        <ul className={cl.nav_ul}>
          <li>
            {' '}
            <NavLink to="/home" className={cl.nav_navLink}>
              Главная{' '}
            </NavLink>
          </li>{' '}
          <li className={cl.nav_navLink}> Привет, {isAuth.name}!</li>{' '}
          <li>
            <NavLink onClick={logout} to="/signup" className={cl.nav_navLink}>
              Выйти
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className={cl.nav_ul}>
          <li>
            {' '}
            <NavLink to="/" className={cl.nav_navLink}>
              Добро пожаловать{' '}
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={cl.nav_navLink}>
              Войти{' '}
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={cl.nav_navLink}>
              Регистрация{' '}
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
