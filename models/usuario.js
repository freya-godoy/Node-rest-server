import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatiorio']
    },

    correo: {
        type: String,
        require: [true, 'El correo es obligatiorio'],
        unique: true
    },

    password: {
        type: String,
        require: [true, 'La contraseña es obligatioria']
    },

    img: {
        type: String,
    },

    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

export const Usuario = model('Usuario', UsuarioSchema)



