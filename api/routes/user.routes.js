const express = require('express');
const router = express.Router();
const { getById } = require('../controllers/users.controller');
const authJwt = require('../middlewares/authJwt');

//brands
// router.get('/details/:id', getById);
// router.get('/', getAll);
router.get('/profile',[authJwt.verifyToken], getById);

module.exports = router;
