require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas 
app.use(require('./routes/v1'));

//process.env.URL_DB
//'mongodb://localhost:27017/cafe'
mongoose.connect(process.env.URL_DB, (err,res) =>{
    if (err) throw err;
    console.log('Connected to db');
});

app.listen(process.env.PORT , () => {
    console.log('running at',process.env.PORT);
});