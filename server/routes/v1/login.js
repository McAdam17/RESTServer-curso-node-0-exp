const express = require('express');
const userController = require('../../controllers/usuario');
const bcrypt = require('bcrypt');
const app = express();


app.post('/v1/login', userController.login);



module.exports = app;
