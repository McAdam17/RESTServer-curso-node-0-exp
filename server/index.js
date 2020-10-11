require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.json({"nombre":"adan"})
});

app.listen(process.env.PORT , () => {
    console.log('running at',process.env.PORT);
});