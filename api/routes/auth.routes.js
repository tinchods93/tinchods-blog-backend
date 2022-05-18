const express = require('express');
const router = express.Router();
// const { getAll, getById } = require('../controllers/users.controller');
const { register, login } = require('../controllers/auth.controller');

//brands
// router.get('/details/:id', getById);
// router.get('/', getAll);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
