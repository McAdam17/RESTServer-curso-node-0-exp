const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


app.get('/v1/img/:nameImg', (req,res)=>{
    const nombreImg = req.params.nameImg;
    const fullpath = path.resolve(__dirname,`../../../uploads/${nombreImg}`);
    res.sendFile(fullpath);
});



module.exports = app;