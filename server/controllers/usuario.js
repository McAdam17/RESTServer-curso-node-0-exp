const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

//---------------------------
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
    Usuario.find({state: true},'name email role state google img')
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

const updateImg = (id,imgn, callback) =>{

    Usuario.findOneAndUpdate(id, {img:imgn}, {new:true, runValidators: true, context: 'query'},(err, usuarioDB) => {
        let resul = {};
        if (err){
            resul = {
                status: false,
                err
            };
        }
        resul = {
            status: true,
            usuario: usuarioDB
        };
        callback(resul);
    });
}

const login = (req,res) =>{
    const body = req.body;

    Usuario.findOne({email: body.email},(err,usuarioDB) =>{
        if (err){
            return res.status(400).json({
                status: false,
                err
            });
        }
        if(!usuarioDB){
            return res.status(400).json({
                status: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if(!bcrypt.compareSync(body.password,usuarioDB.password)){
            return res.status(400).json({
                status: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        },process.env.SEED_TOKEN,{expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            status: true,
            usuario: usuarioDB,
            token
        })

    });

}

module.exports = {
    insert,
    update,
    get,
    getAll,
    eliminar,
    updateImg,
    login
}