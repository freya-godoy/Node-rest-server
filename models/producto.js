import { Schema, model } from "mongoose";

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre  es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }
});

ProductoSchema.methods.toJSON = function () {

    const { __v, estado, ...data } = this.toObject();
    return data;
}


export const Producto = model('producto', ProductoSchema);
