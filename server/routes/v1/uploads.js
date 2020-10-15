const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const {verificarToken} = require('../../middlewares/autenticacion');
const usuarioController = require('../../controllers/usuario');

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.put('/v1/usuario/img',verificarToken, (req,res)=>{
    
    const idUser = req.usuario._id;

    if(!req.files)
        return res.status(400).json({status:false,message:'No hay archivos para subir'});
    const imagen = req.files.imagen;
    const nombreImgCortado = imagen.name.split('.');
    const extencion = nombreImgCortado[nombreImgCortado.length -1];

    const extencionesValidas = ['png','jpg','jpeg','gif'];

    if (extencionesValidas.indexOf(extencion) < 0){
        return res.status(400).json({
            status:false,
            message:'Las extenciones permitidas son; '+extencionesValidas.join(', '),
            extencionInvalida: extencion
        });
    }
    else{
        const fullPathImg = `uploads/img${idUser}${imagen.name}`;
        imagen.mv(fullPathImg,(err)=>{
            if(err)
                return res.status(500).json({
                    status:false,err
                });

            usuarioController.updateImg(idUser,fullPathImg,(result) => {
                if(result.status==true){
                    res.json(result);
                }else{
                    res.status(500).json(result);
                }
            }); 
            
            
        });
    }
    
});


module.exports = app;