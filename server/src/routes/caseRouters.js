const route = require('express').Router();
const {
  getAllCases,
  createNewPost,
  deleteCase,
  changeStatus,
  editCase,
} = require('../controllers/caseControllers');

route.get('/all', getAllCases);

route.post('/', createNewPost);

route.delete('/:id', deleteCase);

route.patch('/:id', changeStatus);
route.put('/:id', editCase);

module.exports = route;
