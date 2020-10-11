const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const _ = require('underscore');

const insert = (req,res) => {
    const body = req.body;
    const usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });
    usuario.save((err,usuarioDB)=>{
        if (err){
            return res.status(400).json({
                status: false,
                err
            })
        }
        res.json({
            status: true,
            usuario: usuarioDB
        })
    });
}

const get = (req,res) => {
    const id = req.params.id;
    Usuario.findById(id, (err, usuarioDB) => {
        if (err){
            return res.status(400).json({
                status: false,
                err
            })
        }
        res.json({
            status: true,
            usuario: usuarioDB
        })
    });
}


const update = (req,res) => {
    const id = req.params.id;
    const body = _.pick(req.body,['name','email','img','role','state']);
    
    Usuario.findOneAndUpdate(id, body, {new:true, runValidators: true, context: 'query'},(err, usuarioDB) => {
        if (err){
            return res.status(400).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            usuario: usuarioDB
        })
    });
}

module.exports = {
    insert,
    update,
    get
}