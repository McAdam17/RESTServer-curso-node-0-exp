const express = require('express');
const app = express();

app.use(require('./imagenes'));
app.use(require('./login'));
app.use(require('./uploads'));
app.use(require('./usuario'));



module.exports = app;

