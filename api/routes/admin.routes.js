const express = require('express');
const { getTable } = require('../controllers/admin.controller');
const router = express.Router();
const authJwt = require('../middlewares/authJwt');

//brands
// router.get('/details/:id', getById);
// router.get('/', getAll);
router.get('/home', [authJwt.verifyToken, authJwt.isAdmin], getTable);

module.exports = router;
