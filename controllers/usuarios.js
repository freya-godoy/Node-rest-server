import { response, request } from 'express'
import bcryptjs from 'bcryptjs'
import { Usuario } from '../models/usuario.js'


const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre = 'no name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({

        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params

    //borrar fisicamente el usuario
    const usuario = await Usuario.findByIdAndDelete({estado : false});

    res.json(usuario);
}


export { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch }