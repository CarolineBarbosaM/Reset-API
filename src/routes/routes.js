const connection = require('../database/connection');
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const AuthController = require('../controller/AuthController');

//ROUTES USER
router.get('/', UserController.listAll);
router.get('/:id', UserController.list);
router.put('/:id', UserController.updated);
router.delete('/:id', UserController.deleted);

//ROUTES AUTH
router.post('/', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;