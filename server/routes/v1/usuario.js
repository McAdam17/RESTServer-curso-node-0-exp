const express = require('express');
const app = express();
const userModel = require('../../controllers/usuario');

app.get('/v1/usuario/:id', userModel.get);

app.post('/v1/usuario', userModel.insert);

app.put('/v1/usuario/:id', userModel.update)


module.exports = app;