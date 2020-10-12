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

const getAll = (req,res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({status: true},'name email role state google img')
                .skip(desde)
                .limit(limite)
                .exec( (err, usuarios) => {
                    if (err){
                        return res.status(400).json({
                            status: false,
                            err
                        });
                    }
            
                    res.json({
                        status: true,
                        total: usuarios.length,
                        usuarios
                    })
                } )
}

const eliminar = (req,res) => {
    const id = req.params.id;
    let del = Boolean(req.query.del) || false;
    if (del)
        Usuario.findByIdAndRemove(id,(err,usuarioBorrado) => {
            if (err){
                return res.status(400).json({
                    status: false,
                    err
                });
            }

            if(!usuarioBorrado){
                return res.status(400).json({
                    status: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                });
            }

            res.json({
                status: true,
                usuario: usuarioBorrado
            })

        });
    else
        Usuario.findByIdAndUpdate(id, {state: false}, {new:true},(err,usuarioBorrado) => {
            if (err){
                return res.status(400).json({
                    status: false,
                    err
                });
            }

            if(!usuarioBorrado){
                return res.status(400).json({
                    status: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                });
            }

            res.json({
                status: true,
                usuario: usuarioBorrado
            })

        });
}

module.exports = {
    insert,
    update,
    get,
    getAll,
    eliminar
}