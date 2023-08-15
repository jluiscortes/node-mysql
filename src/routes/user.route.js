const {Router} = require('express');
const {getUsers} = require('../controllers/user.controller');
const router = Router();

router.get('/users', getUsers);

module.exports = {
    routes: router,
  };
  