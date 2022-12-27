import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initAuthAC, setNullAC, checkAuthAC } from './store/auth/creators';
import './style/App.css';
import Home from './components/Home/Home';
import Welcome from './components/Welcome/Welcome';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAC());
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
