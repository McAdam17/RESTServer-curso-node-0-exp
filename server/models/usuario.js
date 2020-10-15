const mongoose = require('mongoose');

const rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    name:{
        type: String,
        required: [true,'Es nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true,'El correo es necesario']
    },
    password:{
        type: String,
        required: [true,'La contraseña es obligatoria']
    },
    img:{
        type: String,
        required:false,
        default:'uploads/default_user_img.jpg'
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function(){
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;    

    return userObj;
}


module.exports = mongoose.model('Usuario', usuarioSchema);


