const express = require('express');
const route = express.Router();

const UserController = require('../controllers/user');

route.get('/users', async (req, res) => UserController.getAllUser(req, res));

route.post('/users', async (req, res) => UserController.createUser(req, res));

route.get('/', async (req, res) => UserController.getAllUser(req, res));

route.delete('/users/:id', async (req, res) => UserController.deleteUser(req, res));


module.exports = route;