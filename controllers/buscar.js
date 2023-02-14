import { response } from 'express';
import { Usuario } from '../models/usuario.js';
import { Categoria } from '../models/categoria.js';
import { Producto } from '../models/producto.js'
import mongoose from 'mongoose';

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = mongoose.isObjectIdOrHexString(termino);//Si es un ID de mongo devuelve TRUE sino FALSE

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : [] // Pregunto si el usuario existe "(usuario) ?", si existe regreso un arreglo con el usuario "[usuario]" si no, un arreglo basio ": []"
        });
    }

    const regex = new RegExp(termino, 'i'); //Expresion regular. Remplazo "termino" por "regex"

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }], //Expresion regular. Para expandir la busqueda 
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });
}

const buscarCategoria = async (termino = '', res = response) => {

    const esMongoID = mongoose.isObjectIdOrHexString(termino);//Si es un ID de mongo devuelve TRUE sino FALSE

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : [] // Pregunto si la categoria existe "(categoria) ?", si existe regreso un arreglo con el usuario "[usuario]" si no, un arreglo basio ": []"
        });
    }

    const regex = new RegExp(termino, 'i'); //Expresion regular. Remplazo "termino" por "regex"

    const categoria = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categoria
    });
}


const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = mongoose.isObjectIdOrHexString(termino);//Si es un ID de mongo devuelve TRUE sino FALSE

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : [] // Pregunto si la categoria existe "(categoria) ?", si existe regreso un arreglo con el usuario "[usuario]" si no, un arreglo basio ": []"
        });
    }

    const regex = new RegExp(termino, 'i'); //Expresion regular. Remplazo "termino" por "regex"

    const producto = await Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre')

    res.json({
        results: producto
    });
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });

    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);

            break;

        case 'categoria':
            buscarCategoria(termino, res);

            break;
        case 'productos':
            buscarProductos(termino, res);

            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })


            break;
    }


}

export { buscar, coleccionesPermitidas, buscarUsuarios, buscarCategoria, buscarProductos }