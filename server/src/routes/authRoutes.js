const route = require('express').Router();
const {
  signUp,
  logIn,
  logOut,
  checkAuth,
} = require('../controllers/authControllers');

route.post('/signup', signUp);

route.post('/login', logIn);

route.get('/checkAuth', checkAuth);

route.delete('/logout', logOut);

module.exports = route;
