const express = require('express');
const { getUsers, findUserById } = require('../controllers/user.controller');
const router = express.Router();

router.get('/users', getUsers);
router.get('/user/:id', findUserById);


module.exports = {
    routes: router,
  };
  