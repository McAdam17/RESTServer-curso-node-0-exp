const jwt = require('jsonwebtoken');
// Verificar que el token sea el adecuado

const verificarToken = (req,res,next) =>{
    const token = req.get('token');

    jwt.verify(token,process.env.SEED_TOKEN, (err,decoded)=>{
        if(err){
            return res.status(401).json({
                status:false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
    
}


module.exports = {
    verificarToken
}