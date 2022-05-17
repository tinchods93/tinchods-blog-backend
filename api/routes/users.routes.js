const express = require('express');
const router = express.Router();
const { getAll, getById } = require('../controllers/users.controller');

//brands
router.get('/details/:id', getById);
router.get('/', getAll);

module.exports = router;