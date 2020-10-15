const express = require('express');
const app = express();
const {verificarToken} = require('../../middlewares/autenticacion');
const userController = require('../../controllers/usuario');

app.get('/v1/usuario', verificarToken,userController.getAll);

app.get('/v1/usuario/:id', verificarToken, userController.get);

app.post('/v1/usuario', userController.insert);

app.put('/v1/usuario/:id', verificarToken, userController.update);

app.delete('/v1/usuario/:id', verificarToken, userController.eliminar);

module.exports = app;